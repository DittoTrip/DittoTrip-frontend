import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/common/AppBar';
import Star from '../components/common/Star';
import Button from '../components/common/Button';
import ImageUploader from '../components/review/UploadImage';
import useReviewDetail from '../hooks/review/useReviewDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addReview, getReview, modifyReview } from '../api/review';
import { convertURLtoFile } from '../utils/convertURLtoFile';
import { useAuthStore } from '../store/authStore';

export interface FormInputs {
  rating: number;
  body: string;
}

const NewReview = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // 새 리뷰용
  const spotVisitId = queryParams.get('spotVisit'); // 서버로 보낼 때
  // 수정용
  const reviewId = queryParams.get('review'); // 서버로 보낼 때
  // 공통
  const spotId = queryParams.get('spot'); // 기존 정보 불러오기 및 촬영지 데이터 조회용

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const isEditing = reviewId;

  // 촬영지 조회용
  const { spotData } = useReviewDetail(spotId!);
  // 이미지 파일
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  // 이미지 url
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>();

  const body = watch('body');

  useEffect(() => {
    // 수정할 때 id : review id
    // 새로운 리뷰 작성할 때 id: spotVisitId
    if (isEditing) {
      const fetchReviewDetail = async () => {
        const existingReview = await getReview(reviewId!);
        if (existingReview) {
          // 본인이 작성한 글이 아닐 때
          if (!existingReview.reviewData.isMine) {
            alert(`${t('message.permission')}`);
            navigate(-1);
            return;
          }
          setValue('body', existingReview.reviewData.reviewBody);
          setValue('rating', existingReview.reviewData.rating);
          setPreviewUrls(existingReview.reviewData.imagePaths);

          if (existingReview.reviewData.imagePaths && existingReview.reviewData.imagePaths.length > 0) {
            //  Promise.all => 비동기 작업을 병렬로 처리
            const convertedFiles = await Promise.all(
              existingReview.reviewData.imagePaths.map(imagePath => convertURLtoFile(imagePath))
            );
            setSelectedImages(convertedFiles);
          }
        }
      };
      fetchReviewDetail();
    }
  }, [spotVisitId, reviewId, spotId, isEditing, setValue]);

  const onSubmit = async (data: FormInputs) => {
    if (!data.rating) {
      setValue('rating', 4);
    }
    try {
      const formData = new FormData();
      formData.append(
        'saveReq',
        new Blob([JSON.stringify(data)], {
          type: 'application/json',
        })
      );

      selectedImages.forEach(file => {
        formData.append('images', file);
      });

      if (isEditing) {
        await modifyReview(reviewId!, formData);
      } else {
        await addReview(spotVisitId!, formData);
      }

      navigate(`/reviews/${spotId!}`);
    } catch (error) {
      console.error('리뷰 등록/수정 실패', error);
    }
  };

  if (!isLoggedIn) {
    alert(t('guide.login'));
    navigate('/login');
    return;
  }

  return (
    <NewReviewStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{isEditing ? '리뷰 수정' : '리뷰 쓰기'}</div>} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="location-rating-card">
          <div className="spot-name">{spotData}</div>
          <Star
            rating={watch('rating') || 4}
            showRatingValue={false}
            color="keyColor"
            gap={12}
            size={28}
            isEditable={true}
            setRating={setValue}
          />
        </div>
        <div className="review-input-box">
          <div className="input-title text-title">리뷰</div>
          <textarea
            {...register('body', {
              required: '* 필수 작성 사항입니다',
            })}
            className="review-text"
            placeholder={t('newReview.placeholder')}
          />
          <div className="text-length">({body ? body.length : 0}/1000)</div>
          <span className="error-msg">{errors?.body?.message}</span>

          <div className="input-title photo-title">포토</div>
          <ImageUploader
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            previewUrls={previewUrls}
            setPreviewUrls={setPreviewUrls}
          />
        </div>
        <div className="review-submit">
          <Button size="large" scheme="subButton" className="review-submit-button">
            {isEditing ? '수정 완료' : '작성 완료'}
          </Button>
        </div>
      </form>
    </NewReviewStyle>
  );
};

const NewReviewStyle = styled.div`
  .app-bar .title {
    display: flex;
    justify-content: start;

    ${({ theme }) => theme.font.subTitle};
  }

  .location-rating-card {
    padding-top: 12px;
    padding-bottom: 24px;

    border-bottom: 1px solid ${({ theme }) => theme.color.gray40};

    .spot-name {
      text-align: center;
      margin-bottom: 8px;
      ${({ theme }) => theme.font.body2}
    }
  }

  .review-input-box {
    padding: 0 28px;

    .input-title {
      ${({ theme }) => theme.font.body1};
    }

    .text-title {
      margin-top: 28px;
      margin-bottom: 12px;
    }

    .review-text {
      height: 200px;
      width: 100%;
      padding: 15px;

      border-radius: 12px;
      border: none;
      outline: none;

      background-color: ${({ theme }) => theme.color.gray20};
    }

    .photo-title {
      margin-top: 5px;
      margin-bottom: 8px;
    }

    .text-length {
      text-align: right;
      color: ${({ theme }) => theme.color.gray60};
    }
  }

  .review-submit {
    display: flex;
    justify-content: center;

    position: fixed;
    bottom: 100px;
    left: 0;

    width: 100%;
    padding: 0 28px;
  }
`;

export default NewReview;
