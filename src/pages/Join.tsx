import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { styled } from 'styled-components';
import AppBar from '../components/common/AppBar';
import Button from '../components/common/Button';

type Inputs = {
  nickname: string;
  email: string;
  checkEmail: string;
  password: string;
  checkPassword: string;
};

const Join = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [nicknameChecked, setNicknameChecked] = useState<boolean | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);

  const nickname = watch('nickname');

  const checkNickname = async () => {
    // 서버로 닉네임 중복 확인 요청
    const response = await fetch('/api/check-nickname', {
      method: 'POST',
      body: JSON.stringify({ nickname }),
    });
    const result = await response.json();

    if (result.isAvailable) {
      setNicknameChecked(true);
    } else {
      setNicknameChecked(false);
    }
  };

  const sendVerificationEmail = async () => {
    const email = watch('email');
    // 서버로 인증 이메일 발송 요청
    const response = await fetch('/api/send-verification-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      setEmailSent(true);
    }
  };

  const verifyEmailCode = async () => {
    const email = watch('email');
    const code = watch('checkEmail');
    // 서버로 인증 코드 확인 요청
    const response = await fetch('/api/verify-email-code', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
    const result = await response.json();

    if (result.isVerified) {
      setEmailVerified(true);
    } else {
      setEmailVerified(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = data => {
    if (nicknameChecked && emailVerified) {
      console.log('회원가입 데이터:', data);
      // 여기서 실제 회원가입 요청을 서버에 보냅니다.
    } else {
      console.log('닉네임 중복 확인 또는 이메일 인증이 완료되지 않았습니다.');
    }
  };

  return (
    <JoinStyle>
      <div className="app-bar">
        <AppBar leading={false} title={<div className="title">회원가입</div>} />
      </div>
      <div className="content-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section">
            <div className="input-title">닉네임</div>
            <div className="user-varification">
              <input
                {...register('nickname', {
                  required: true,
                  pattern: /[가-힣a-zA-Z0-9]{2,16}$/,
                })}
                placeholder="닉네임"
                className="input-container"
              />
              <Button size={'medium'} scheme={'keyButton'} onClick={checkNickname}>
                중복 확인
              </Button>
            </div>

            {errors.nickname && errors.nickname.type === 'required' && (
              <div className="guide-message">닉네임을 입력해주세요</div>
            )}
            {errors.nickname && errors.nickname.type === 'pattern' && (
              <div className="guide-message">영문 대문자와 소문자, 한글, 숫자를 이용하여 2~10자로 입력해 주세요.</div>
            )}
            {nicknameChecked === false && <div className="guide-message">이미 사용 중인 닉네임입니다.</div>}
          </div>
          <div className="section">
            <div className="input-title">아이디</div>
            <div className="user-varification">
              <input
                {...register('email', { required: true })}
                placeholder="example@gmail.com"
                type="email"
                className="input-container"
              />
              <Button size={'medium'} scheme={'keyButton'} onClick={sendVerificationEmail}>
                인증하기
              </Button>
            </div>
            {errors.email && <div className="guide-message">이메일을 입력해주세요</div>}
            {emailSent && <div className="guide-message">이메일로 인증번호가 발송되었습니다.</div>}
            <div className="user-varification">
              <input
                {...register('checkEmail', { required: true })}
                placeholder="인증번호 입력"
                className="input-container"
              />
              <Button size={'medium'} scheme={'keyButton'} onClick={verifyEmailCode}>
                확인
              </Button>
            </div>
            {errors.checkEmail && <div className="guide-message">인증번호를 입력해주세요</div>}
            {emailVerified === false && <div className="guide-message">인증번호가 올바르지 않습니다.</div>}
          </div>

          <div className="section">
            <div className="input-title">비밀번호</div>
            <div className="user-varification">
              <input
                {...register('password', {
                  required: true,
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/i,
                })}
                placeholder="password"
                type="password"
                className="input-container"
              />
            </div>
            {errors.password && errors.password.type === 'required' && (
              <div className="guide-message">비밀번호를 입력해주세요</div>
            )}
            {errors.password && errors.password.type === 'pattern' && (
              <div className="guide-message">
                영문 대문자와 소문자, 숫자, 특수문자 중 2가지 이상을 조합하여 10~16자로 입력해 주세요.
              </div>
            )}
            <div className="user-varification">
              <input
                {...register('checkPassword', { required: true })}
                placeholder="check password"
                type="password"
                className="input-container"
              />
            </div>
            {errors.checkPassword && <div className="guide-message">비밀번호 확인을 입력해주세요</div>}
          </div>

          <Button size={'large'} scheme={'keyButton'} type="submit">
            가입하기
          </Button>
        </form>
      </div>
    </JoinStyle>
  );
};

const JoinStyle = styled.div`
  .app-bar {
    .title {
      flex: 1;

      text-align: center;
      color: ${({ theme }) => theme.color.keyColor};
      ${({ theme }) => theme.font.subTitle};
    }
  }
  .content-wrapper {
    margin: 30px 28px 0 28px;

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
        margin-left: 2px;
        margin-bottom: 8px;

        color: ${({ theme }) => theme.color.red};
        ${({ theme }) => theme.font.body5};
      }
    }
  }

  .input-container {
    width: 100%;
    height: 52px;
    padding: 15px;
    flex: 1;

    border: none;
    border-radius: 12px;
    background: ${({ theme }) => theme.color.gray20};
  }
`;

export default Join;
