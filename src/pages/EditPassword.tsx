import { useForm, SubmitHandler } from 'react-hook-form';
import { styled } from 'styled-components';
import AppBar from '../components/common/AppBar';
import Button from '../components/common/Button';
import { editPassword } from '../api/auth';
import { useTranslation } from 'react-i18next';

type Inputs = {
  originPassword: string;
  newPassword: string;
  checkPassword: string;
};

const EditPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<Inputs> = data => {
    const req = { originPassword: data.originPassword, newPassword: data.newPassword };
    editPassword(req).then(
      res => {
        alert(`${t('message.passwordFix')}`);
        reset();
      },
      error => {
        alert(`${t('message.solution')}`);
        console.log(error);
      }
    );
  };

  return (
    <EditPasswordStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{t('editPassword.title')}</div>} />
      </div>
      <div className="content-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section">
            <div className="input-title">{t('editPassword.password')}</div>
            <div className="user-varification">
              <input
                {...register('originPassword', {
                  required: { value: true, message: t('join.passwordRequired') },
                })}
                placeholder={t('join.password')}
                type="password"
                className="input-container"
              />
            </div>
            {errors.originPassword && <div className="guide-message">{errors.originPassword.message}</div>}
          </div>
          <div className="section">
            <div className="input-title">{t('editPassword.newPassword')}</div>
            <div className="user-varification">
              <input
                {...register('newPassword', {
                  required: { value: true, message: t('join.passwordRequired') },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/i,
                    message: t('join.passwordPattern'),
                  },
                })}
                placeholder={t('join.password')}
                type="password"
                className="input-container"
              />
            </div>
            {errors.newPassword && <div className="guide-message">{errors.newPassword.message}</div>}

            <div className="user-varification">
              <input
                {...register('checkPassword', {
                  required: { value: true, message: t('join.checkPasswordRequired') },
                  validate: {
                    positive: value => value === watch('newPassword') || t('join.passwordMismatch'),
                  },
                })}
                placeholder={t('join.checkPassword')}
                type="password"
                className="input-container"
              />
            </div>

            {errors.checkPassword ? (
              <div className="guide-message">{errors.checkPassword.message}</div>
            ) : (
              <div className="guide-message"></div>
            )}
          </div>
          <div className="password-submit">
            <Button size={'large'} scheme={'keyButton'} type="submit" className="join-btn">
            {t('editPassword.Change')}
            </Button>
          </div>
        </form>
      </div>
    </EditPasswordStyle>
  );
};

const EditPasswordStyle = styled.div`
  .app-bar {
    .title {
      flex: 1;

      ${({ theme }) => theme.font.subTitle};
    }
  }
  .content-wrapper {
    margin: 30px 28px 0 28px;
    height: 100vh;

    .section {
      .input-title {
        margin-bottom: 10px;

        color: ${({ theme }) => theme.color.gray80};
        ${({ theme }) => theme.font.body2};
      }
      .user-varification {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 13px;

        margin-bottom: 10px;
      }
      .guide-message {
        min-height: 20px;

        margin-left: 2px;
        margin-bottom: 8px;

        color: ${({ theme }) => theme.color.red};
        ${({ theme }) => theme.font.body5};
      }
      .sending {
        min-height: 20px;

        margin-left: 2px;
        margin-bottom: 8px;

        color: ${({ theme }) => theme.color.keyColor};
        ${({ theme }) => theme.font.body5};
      }
    }
  }

  .input-container {
    width: 100%;
    height: 52px;
    padding: 15px;
    flex: 1;

    outline: none;
    border: none;
    border-radius: 12px;
    background: ${({ theme }) => theme.color.gray20};
  }

  .password-submit {
    position: fixed;
    bottom: 100px;
    left: 0;
    width: 100%;
    padding: 0 28px;
  }
`;

export default EditPassword;
