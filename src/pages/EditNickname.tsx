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
      if (duplicateResponse === 200) {
        const editResponse = await editNickname(req);
        if (editResponse === 200) {
          alert('수정되었습니다.');
        } else {
          alert('닉네임 수정에 실패했습니다.');
        }
      } else {
        alert('이미 존재하는 닉네임입니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EditNicknameStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{'닉네임 변경'}</div>} />
      </div>
      <div className="content-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-title">{'닉네임'}</div>
          <div className="user-verification">
            <input
              placeholder="닉네임"
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
              {'수정하기'}
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
      margin 100px;

      outline: none;
      border: none;
      border-radius: 12px;
      background: ${({ theme }) => theme.color.gray20};
    }
`;

export default EditNickname;
