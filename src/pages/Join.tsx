import { useForm, SubmitHandler } from 'react-hook-form';
import { styled } from 'styled-components';
import AppBar from '../components/common/AppBar';
import Button from '../components/common/Button';

type Inputs = {
  nickname: string;
  email: string;
  password: string;
};

const Join = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <JoinStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">회원가입</div>} />
      </div>
      <div className="content-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section">
            <div className="input-title">닉네임</div>
            <div className="user-varification">
              <input {...register('nickname')} placeholder="닉네임" className="input-container" />
            </div>
            {errors.email && <span>닉네임을 입력해주세요</span>}
            <div className="error-message">이미 사용 중인 닉네임입니다.</div>
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
              <Button size={'medium'} scheme={'keyButton'}>
                중복 확인
              </Button>
            </div>
            <div className="user-varification">
              <input
                {...register('email', { required: true })}
                placeholder="example@gmail.com"
                type="email"
                className="input-container"
              />
              <Button size={'medium'} scheme={'keyButton'}>
                인증하기
              </Button>
            </div>
            {errors.email && <span className="guide-message">이메일을 입력해주세요</span>}
            <div className="error-message">이미 가입된 이메일입니다. 다시 확인해 주세요.</div>
          </div>
          <div className="section">
            <div className="input-title">비밀번호</div>
            <div className="user-varification">
              <input
                {...register('password', { required: true })}
                placeholder="password"
                type="password"
                className="input-container"
              />
            </div>
            {errors.password && <span className="guide-message">비밀번호를 입력해주세요</span>}
          </div>
          <div className="section">
            <input
              {...register('password', { required: true })}
              placeholder="check password"
              type="password"
              className="input-container"
            />
            {errors.password && <span className="guide-message">비밀번호확인을 입력해주세요</span>}
            <div className="error-message">
              영문 대문자와 소문자, 숫자, 특수문자 중 2가지 이상을 조합하여 10~16자로 입력해 주세요.
            </div>
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
      color: ${({ theme }) => theme.color.keyColor};
      ${({ theme }) => theme.font.subTitle};
    }
  }
  .content-wrapper {
    margin: 0 28px;

    .section {
      .input-title {
        color: ${({ theme }) => theme.color.gray80};
        ${({ theme }) => theme.font.body2};
        margin-bottom: 10px;
      }
      .user-varification {
        display: flex;
        gap: 13px;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .error-message {
        color: ${({ theme }) => theme.color.red};
        margin-bottom: 10px;
      }
    }
  }

  .input-container {
    flex: 1;
    border: none;
    border-radius: 12px;
    height: 52px;
    flex: 1;
    width: 100%;
    background: ${({ theme }) => theme.color.gray20};
  }
  .guide-message {
    color: ${({ theme }) => theme.color.red};
  }
`;
export default Join;
