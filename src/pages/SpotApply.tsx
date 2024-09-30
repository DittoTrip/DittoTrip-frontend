import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

import { addSpotApply } from '../api/spotApply';

import AppBar from '../components/common/AppBar';
import Button from '../components/common/Button';
import AddressSearch from '../components/AddressFinder';
import ImageUploader from '../components/review/UploadImage';
import MainImageUploader from '../components/review/UploadOneImage';
import TagInput from '../components/common/TagInput';
import CategorySearch from '../components/common/CategorySearch';
import { CategoryData } from '../models/category/categoryModel';

export interface FormInputs {
  name: string;
  address: string;
  pointX: number;
  pointY: number;
  categoryIds: number[];
  hashtagNames: string[];
}

const SpotApply = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

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

  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>();

  const onValid = async (data: FormInputs) => {
    if (!isLoggedIn) {
      alert(t('guide.login'));
      navigate('/login');
      return;
    }

    const formData = new FormData();

    // 스팟 정보 추가

    formData.append(
      'saveReq',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }) // application/json 형식으로 넣어 주기
    );

    // 메인 이미지
    formData.append('image', selectedMainImage!);

    // 스틸컷
    selectedImages.forEach(file => {
      formData.append('images', file);
    });

    // 폼 객체 key 와 value 값을 순회.
    const entries = formData.entries();
    for (const pair of entries) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      setSending(true);
      await addSpotApply(formData);
      alert(t('spotApply.successMessage'));
      navigate(`/my-spotapply`);
    } catch (error) {
      alert(t('spotApply.errorMessage'));
    } finally {
      setSending(true);
    }
  };

  const handleAddTag = (newTag: string) => {
    setTags([...tags, newTag]);
    setValue('hashtagNames', [...tags, newTag]);
  };

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
    setValue(
      'hashtagNames',
      tags.filter(t => t !== tag)
    );
  };

  return (
    <>
      <SpotApplyStyle>
        <div className="app-bar">
          <AppBar leading={true} title={<div className="title">{t('spotApply.title')}</div>} action={<></>} />
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
                  {t('spotApply.name')} <span className="error-msg">{errors?.name?.message}</span>
                </div>
                <input
                  {...register('name', {
                    required: t('guide.mandatory'),
                  })}
                  className="spot-input"
                  placeholder={t('spotApply.placeholder.name')}
                />
              </div>
              <div className="spot-box">
                <div className="spot-title">
                  {t('spotApply.address')} <span className="error-msg">{errors?.address?.message}</span>
                </div>
                <input
                  {...register('address', {
                    required: t('guide.mandatory'),
                  })}
                  className="spot-input"
                  placeholder={t('spotApply.placeholder.address')}
                  readOnly
                  onClick={() => setAddressModalOpen(true)}
                />
              </div>
              <div className="spot-box">
                <div className="spot-title">{t('spotApply.category')}</div>
                <CategorySearch
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  setValue={setValue}
                />
              </div>

              <div className="spot-box">
                <div className="tag-wrapper">
                  <span className="spot-title">{t('spotApply.tag')}</span>
                  <span className="tag-length">({tags.length}/10)</span>
                </div>
                <TagInput tags={tags} handleAddTag={handleAddTag} handleDeleteTag={handleDeleteTag} />
              </div>

              <div className="spot-box last-spot-box">
                <div className="tag-wrapper">
                  <div className="spot-title">{t('spotApply.stillcut')}</div>
                </div>
                <ImageUploader
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                  previewUrls={previewUrls}
                  setPreviewUrls={setPreviewUrls}
                />
              </div>
              <div className="submit-wrapper">
                <Button size="large" scheme="subButton" className="spot-submit-button" disabled={sending}>
                  {t('spotApply.apply')}
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

      .submit-wrapper {
        margin: 0 28px;
      }
    }
  }

  .error-msg {
    color: ${({ theme }) => theme.font.keyColor};
    ${({ theme }) => theme.font.body6};
  }
`;

export default SpotApply;
