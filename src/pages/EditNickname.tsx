import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import AppBar from '../components/common/AppBar';
import { duplicationCheck, editNickname } from '../api/auth';

const EditNickname = () => {
  const { t } = useTranslation();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    try {
      const nickname = watch('nickname');
      const req = { nickname };

      const duplicateResponse = await duplicationCheck(req);
      if (duplicateResponse) {
        const editResponse = await editNickname(req);
        if (editResponse) {
          alert(`${t('message.modify')}`);
        } else {
          alert(`${t('message.nicknameFixFail')}`);
        }
      } else {
        alert(`${t('message.already')}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EditNicknameStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{t('editNickname.title')}</div>} />
      </div>
      <div className="content-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-title">{t('editNickname.nickname')}</div>
          <div className="user-verification">
            <input
              placeholder={t('editNickname.input')}
              type="text"
              {...register('nickname', {
                required: '닉네임은 필수 입력 사항입니다.',
                pattern: {
                  value: /[가-힣a-zA-Z0-9]{2,10}$/,
                  message: t('join.nicknamePattern'),
                },
              })}
              className="input-container"
            />
            <Button size={'medium'} scheme={'keyButton'} type="submit" disabled={isSubmitting}>
              {t('editNickname.checkDuplication')}
            </Button>
          </div>
          {errors.nickname && <div className="sending">{errors.nickname.message?.toString()}</div>}
        </form>
      </div>
    </EditNicknameStyle>
  );
};

const EditNicknameStyle = styled.div`
  .app-bar {
    .title {
      flex: 1;

      color: black;
      ${({ theme }) => theme.font.subTitle};
    }
  }
  .content-wrapper {
    margin: 30px 28px 0 28px;

    .input-title {
      margin-bottom: 10px;

      color: ${({ theme }) => theme.color.gray80};
      ${({ theme }) => theme.font.body2};
    }

    .user-verification {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 13px;

      margin-bottom: 10px;
    }

    .sending {
      min-height: 20px;

      margin-left: 5px;
      margin-bottom: 8px;

      color: ${({ theme }) => theme.color.keyColor};
      ${({ theme }) => theme.font.body5};
    }
  }

  .input-container {
    height: 52px;
    padding: 15px;
    flex: 1;
    margin: 0px;

    outline: none;
    border: none;
    border-radius: 12px;
    background: ${({ theme }) => theme.color.gray20};
  }
`;

export default EditNickname;
