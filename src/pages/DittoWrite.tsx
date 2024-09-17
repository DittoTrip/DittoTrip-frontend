import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';
import TagInput from '../components/common/TagInput';
import MainImageUploader from '../components/review/UploadOneImage';
import { useForm } from 'react-hook-form';
import { addDitto } from '../api/ditto'; // Assuming the API call is in this file
import { useNavigate } from 'react-router-dom';

export interface FormInputs {
  title: string;
  body: string;
  hashtagNames: string[];
}

const DittoWrite = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>();

  // 대표 이미지
  const [selectedMainImage, setSelectedMainImage] = useState<File | null>(null);
  const [mainpreviewUrl, setMainPreviewUrl] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const body = watch('body');

  const navigate = useNavigate();

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

  const onSubmit = async (data: FormInputs) => {
    try {
      const formData = new FormData();
      formData.append(
        'saveReq',
        new Blob([JSON.stringify(data)], {
          type: 'application/json',
        }) // application/json 형식으로 넣어 주기
      );

      if (selectedMainImage) {
        formData.append('image', selectedMainImage);
      }

      const entries = formData.entries();
      for (const pair of entries) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      const status = await addDitto(formData);
      if (status === 200) {
        navigate('/ditto');
      }
    } catch (error) {
      console.error('디토 등록 실패', error);
    }
  };

  return (
    <DittoWriteStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">작성하기</div>} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="main-img">
          <MainImageUploader
            setSelectedImage={setSelectedMainImage}
            previewUrl={mainpreviewUrl}
            setPreviewUrl={setMainPreviewUrl}
          />
        </div>
        <div className="content-wrapper">
          <input
            {...register('title', {
              required: '* 필수 작성 사항입니다',
            })}
            className="spot-input"
            placeholder="스팟 이름"
          />
          <span className="error-msg">{errors?.title?.message}</span>
        </div>
        <div className="ditto-input-box">
          <div className="text-title">설명</div>
          <textarea
            className="ditto-text"
            placeholder={t('newReview.placeholder')}
            {...register('body', { required: '* 필수 작성 사항입니다', maxLength: 1000 })}
          />
          <div className="text-length">({body ? body.length : 0}/1000)</div>
          {errors.body && <span className="error-msg">{errors?.body?.message}</span>}

          <div className="spot-box">
            <div className="tag-wrapper">
              <span className="text-title">태그</span>
              <span className="tag-length">({tags.length}/10)</span>
            </div>
            <TagInput tags={tags} handleAddTag={handleAddTag} handleDeleteTag={handleDeleteTag} />
            {errors.hashtagNames && <span>{errors.hashtagNames.message}</span>}
          </div>
        </div>

        <div className="ditto-submit">
          <Button type="submit" size="large" scheme="subButton">
            완료하기
          </Button>
        </div>
      </form>
    </DittoWriteStyle>
  );
};

const DittoWriteStyle = styled.div`
  .app-bar {
    .title {
      ${({ theme }) => theme.font.subTitle}
    }
  }

  .spot-input {
    outline: none;
    border: none;
    width: 100%;
    cursor: pointer;
    ${({ theme }) => theme.font.subTitle}
    text-align: center;
  }

  .content-wrapper {
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray40};
  }

  .ditto-input-box {
    padding: 0 28px;

    .text-title {
      ${({ theme }) => theme.font.body1}; //
    }

    .ditto-text {
      height: 200px;
      width: 100%;
      padding: 15px;
      margin-top: 12px;

      border-radius: 12px;
      border: none;
      outline: none;

      background-color: ${({ theme }) => theme.color.gray20};
    }
    .spot-input::placeholder {
      text-align: center;
    }

    .text-length {
      text-align: right;
      color: ${({ theme }) => theme.color.gray60};
    }
    .tag-length {
      color: ${({ theme }) => theme.color.gray60};
    }

    .tag-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;

      margin-bottom: 12px;
      text-align: center;
    }
  }

  .ditto-submit {
    display: flex;
    justify-content: center;

    position: fixed;
    bottom: 20px;
    left: 0;

    width: 100%;
    padding: 0 28px;
  }

  .error-msg {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.body6};
  }
`;

export default DittoWrite;
