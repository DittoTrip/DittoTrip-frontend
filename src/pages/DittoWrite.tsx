import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';
import TagInput from '../components/common/TagInput';
import MainImageUploader from '../components/review/UploadOneImage';
import { useForm } from 'react-hook-form';
import { addDitto, getDitto, modifyDitto } from '../api/ditto';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { convertURLtoFile } from '../utils/convertURLtoFile';
import LangSelectButton from '../components/LangSelectButton';
import { useAuthStore } from '../store/authStore';

export interface FormInputs {
  title: string;
  body: string;
  hashtagNames: string[];
}

const DittoWrite = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const dittoId = searchParams.get('ditto');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>();

  const [selectedMainImage, setSelectedMainImage] = useState<File | null>(null);
  const [mainPreviewUrl, setMainPreviewUrl] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const body = watch('body');
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (dittoId) {
      const fetchDittoDetail = async () => {
        const existingDitto = await getDitto(dittoId);
        if (existingDitto.dittoData.isMine == false) {
          navigate(`/ditto/${dittoId}`);
        }
        if (existingDitto) {
          setValue('title', existingDitto.dittoData.title);
          setValue('body', existingDitto.dittoData.body);
          setTags(existingDitto.dittoData.hashtags || []);
          setMainPreviewUrl(existingDitto.dittoData.imagePath);
          const file = await convertURLtoFile(existingDitto.dittoData.imagePath);
          setSelectedMainImage(file);
        }
      };
      fetchDittoDetail();
    }
  }, [dittoId, setValue]);

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
    if (!selectedMainImage) {
      alert(t('guide.mandatoryImage'));
      return;
    }

    if (!isLoggedIn) {
      alert(t('guide.login'));
      navigate('/login');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('saveReq', new Blob([JSON.stringify(data)], { type: 'application/json' }));

      if (selectedMainImage) {
        formData.append('image', selectedMainImage);
      }

      setSending(true);
      if (dittoId) {
        await modifyDitto(dittoId, formData);
      } else {
        await addDitto(formData);
      }
      setSending(false);

      navigate('/ditto');
    } catch (error) {
      alert(t('guide.error'));
      console.error('디토 등록 실패', error);
    }
  };

  return (
    <DittoWriteStyle>
      <div className="app-bar">
        <AppBar
          leading={true}
          title={<div className="title">{dittoId ? t('write.modify') : t('write.write')}</div>}
          action={<LangSelectButton />}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="main-img">
          <MainImageUploader
            setSelectedImage={setSelectedMainImage}
            previewUrl={mainPreviewUrl}
            setPreviewUrl={setMainPreviewUrl}
          />
        </div>
        <div className="content-wrapper">
          <input
            {...register('title', { required: t('guide.mandatory') })}
            className="spot-input"
            placeholder={t('spotApply.name')}
          />
          <span className="error-msg">{errors?.title?.message}</span>
        </div>
        <div className="ditto-input-box">
          <div className="text-title">{t('write.content')}</div>
          <textarea
            className="ditto-text"
            placeholder={t('newReview.placeholder')}
            {...register('body', { required: t('guide.mandatory'), maxLength: 1000 })}
          />
          <div className="text-length">({body ? body.length : 0}/1000)</div>
          {errors.body && <span className="error-msg">{errors?.body?.message}</span>}

          <div className="spot-box">
            <div className="tag-wrapper">
              <span className="text-title">{t('write.tags')}</span>
              <span className="tag-length">({tags.length}/10)</span>
            </div>
            <TagInput tags={tags} handleAddTag={handleAddTag} handleDeleteTag={handleDeleteTag} />
            {errors.hashtagNames && <span>{errors.hashtagNames.message}</span>}
          </div>
        </div>

        <div className="ditto-submit">
          <Button type="submit" size="large" scheme="subButton" disabled={sending}>
            {dittoId ? t('write.modify') : t('write.submit')}
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
    margin: 0 28px 12px 28px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray40};
  }

  .ditto-input-box {
    padding: 0 28px;

    .text-title {
      ${({ theme }) => theme.font.body1};
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
