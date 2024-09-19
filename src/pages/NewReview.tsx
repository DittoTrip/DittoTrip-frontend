import { useState } from 'react';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/common/AppBar';
import LangSelectButton from '../components/LangSelectButton';
import Star from '../components/common/Star';
import Button from '../components/common/Button';
import ImageUploader from '../components/review/UploadImage';
import useReviewDetail from '../hooks/review/useReviewDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addReview } from '../api/review';

export interface FormInputs {
  rating: number;
  body: string;
}

const NewReview = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { spotData } = useReviewDetail(id!);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>();

  // 별점

  // const rating = watch('rating');

  // 내용
  const body = watch('body');

  // 포토
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

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
        }) // application/json 형식으로 넣어 주기
      );

      // 이미지 배열 추가
      selectedImages.forEach(file => {
        formData.append('images', file);
      });

      const entries = formData.entries();
      for (const pair of entries) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      const status = await addReview(formData);
      if (status === 200) {
        navigate(`/reviews/${id!}`);
      }
    } catch (error) {
      console.error('리뷰 등록 실패', error);
    }
  };

  return (
    <NewReviewStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">리뷰 쓰기</div>} action={<LangSelectButton />} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="location-rating-card">
          <div className="spot-name">{spotData}</div>
          <Star
            rating={4}
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
            작성 완료
          </Button>
        </div>
        /
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
