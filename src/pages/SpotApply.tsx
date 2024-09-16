import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { addSpotApply } from '../api/spotApply';

import AppBar from '../components/common/AppBar';
import Button from '../components/common/Button';
import AddressSearch from '../components/AddressFinder';
import ImageUploader from '../components/review/UploadImage';
import MainImageUploader from '../components/review/UploadOneImage';
import TagInput from '../components/common/TagInput';
import CategorySearch from '../components/common/CategorySearch';
import { CategoryData } from '../models/Category/categoryModel';

export interface ISpotForm {
  name: string;
  address: string;
  pointX: number;
  pointY: number;
  categoryIds: number[];
  hashtagNames: string[];
}

const SpotApply = () => {
  // 주소 검색
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  // 스틸컷
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // 대표 이미지
  const [selectedMainImage, setSelectedMainImage] = useState<File | null>(null);
  const [mainpreviewUrl, setMainPreviewUrl] = useState<string | null>(null);

  // 카테고리
  const [selectedCategory, setSelectedCategory] = useState<CategoryData[]>([]);

  // 태그
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ISpotForm>();

  const onValid = async (data: ISpotForm) => {
    const formData = new FormData();

    // 스팟 정보 추가

    formData.append(
      'saveReq',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }) // application/json 형식으로 넣어 주기
    );

    formData.append('image', selectedMainImage!); // 'images'라는 키로 파일을 추가

    // 선택한 이미지 배열을 'images'라는 키로 추가
    selectedImages.forEach(file => {
      formData.append('images', file); // 'images'라는 키로 파일을 추가
    });

    // 폼 객체 key 와 value 값을 순회.
    const entries = formData.entries();
    for (const pair of entries) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      await addSpotApply(formData); // API 호출
      alert('스팟 등록이 완료되었습니다!');
    } catch (error) {
      alert('스팟 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <SpotApplyStyle>
        <div className="app-bar">
          <AppBar leading={true} title={<div className="title">스팟 신청하기</div>} action={<></>} />
        </div>

        <div className="spot-apply-container">
          <div className="main-img">
            <MainImageUploader
              setSelectedImage={setSelectedMainImage}
              previewUrl={mainpreviewUrl}
              setPreviewUrl={setMainPreviewUrl}
            />
          </div>

          <form onSubmit={handleSubmit(onValid)}>
            <div className="content-wrapper">
              <div className="spot-box">
                <div className="spot-title">
                  이름 <span className="error-msg">{errors?.name?.message}</span>
                </div>
                <input
                  {...register('name', {
                    required: '* 필수 작성 사항입니다',
                  })}
                  className="spot-input"
                  placeholder="스팟의 이름을 알려 주세요!"
                />
              </div>
              <div className="spot-box">
                <div className="spot-title">
                  주소 <span className="error-msg">{errors?.address?.message}</span>
                </div>
                <input
                  {...register('address', {
                    required: '* 필수 작성 사항입니다',
                  })}
                  className="spot-input"
                  placeholder="스팟의 주소는 어떻게 되나요?"
                  readOnly
                  onClick={() => setAddressModalOpen(true)}
                />
              </div>
              <div className="spot-box">
                <div className="spot-title">카테고리</div>
                <CategorySearch
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  setValue={setValue}
                />
              </div>

              <div className="spot-box">
                <div className="tag-wrapper">
                  <span className="spot-title">태그</span>
                  <span className="tag-length">({tags.length}/10)</span>
                </div>
                <TagInput tags={tags} setTags={setTags} setValue={setValue} />
              </div>

              <div className="spot-box last-spot-box">
                <div className="tag-wrapper">
                  <div className="spot-title">스틸컷</div>
                </div>
                <ImageUploader
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                  previewUrls={previewUrls}
                  setPreviewUrls={setPreviewUrls}
                />
              </div>
              <div className="submit-wrapper">
                <Button size="large" scheme="subButton" className="spot-submit-button">
                  스팟 등록
                </Button>
              </div>
            </div>
          </form>
        </div>
      </SpotApplyStyle>
      <AddressSearch setValue={setValue} isOpen={addressModalOpen} setIsOpen={setAddressModalOpen} />
    </>
  );
};

const SpotApplyStyle = styled.div`
  .app-bar {
    .title {
      ${({ theme }) => theme.font.subTitle}
    }
  }

  .spot-apply-container {
    display: flex;
    flex-direction: column;

    .main-img {
      height: 200px;
      border-bottom: solid 1px;
      color: ${({ theme }) => theme.color.gray40};
    }
    .content-wrapper {
      .spot-box {
        margin: 0 28px;
        padding: 21px 0;
        border-bottom: solid 1px;
        color: ${({ theme }) => theme.color.gray40};

        &.last-spot-box {
          border: none;
        }
      }

      .tag-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }

      .spot-title {
        ${({ theme }) => theme.font.body2}
        margin-right : 4px;
      }

      .tag-length,
      .still-length {
        color: ${({ theme }) => theme.color.gray60};
        ${({ theme }) => theme.font.body4}
      }

      .spot-input {
        outline: none;
        border: none;
        width: 100%;
        cursor: pointer;
        ${({ theme }) => theme.font.body3}
      }

      .review-submit {
        padding: 0 8%;
        display: flex;
        justify-content: center;
      }

      .submit-wrapper {
        margin: 0 28px;
      }
    }
  }

  .error-msg {
    color: #0044f1;
    ${({ theme }) => theme.font.body6};
  }
`;

export default SpotApply;
