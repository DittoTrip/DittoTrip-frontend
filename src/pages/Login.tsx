import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { login } from '../api/auth';
import { useAuthStore } from '../store/authStore';

import Button from '../components/common/Button';
import InputText from '../components/Login/InputText';
import kakaoImg from '../assets/kakao.png';
import { LoginProps } from '../models/login/loginModel';

const Login = () => {
  const navigate = useNavigate();
  const { storeLogin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    console.log(data);
    login(data).then(
      res => {
        storeLogin(res.accessToken, res.refreshToken);
        console.log(res);
        navigate('/');
      },
      error => {
        console.log(error);
        alert('로그인에 실패했습니다.');
      }
    );
  };

  return (
    <LoginStyle>
      <div className="title">
        어서오세요!
        <br />
        오늘은 무슨 디토를 해볼까요?
      </div>

      <form className="input" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <InputText placeholder="이메일" inputType="email" {...register('email', { required: true })} />
          {errors.email && <p className="error-text">이메일을 입력해주세요</p>}
        </fieldset>
        <fieldset>
          <InputText placeholder="비밀번호" inputType="password" {...register('password', { required: true })} />
          {errors.password && <p className="error-text">비밀번호를 입력해주세요</p>}
        </fieldset>
        <fieldset>
          <Button type="submit" size="large" scheme="keyButton">
            로그인
          </Button>
        </fieldset>
      </form>

      <div className="container">
        <div className="find-pw">
          <a href="/find-password">비밀번호 찾기</a>
        </div>
        <div className="divider"></div>
        <div className="join">
          <a href="/join">회원가입</a>
        </div>
      </div>
      <div className="text">또는</div>
      <Button size="large" scheme="kakao">
        <a href="http://dittotrip.site/oauth2/authorization/kakao" className="kakao-button">
          <img src={kakaoImg} alt="카카오" className="kakao-img" />
          카카오톡 로그인
        </a>
      </Button>
    </LoginStyle>
  );
};

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;

  margin: 0 28px;

  .title {
    width: 100%;
    margin-bottom: 30px;
    text-align: left;

    ${({ theme }) => theme.font.subTitle}
    color: ${({ theme }) => theme.color.keyColor};
    font-weight: bold;
  }
  form {
    width: 100%;
  }
  fieldset {
    border: none;
    padding: 0;
    .error-text {
      color: red;
      margin: 0 0 10px 0;
    }
  }

  .input {
    margin-bottom: 20px;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 50px;
  }

  .container a,
  .text {
    display: block;
    text-align: center;
    width: 100px;

    ${({ theme }) => theme.font.body4}
    color: ${({ theme }) => theme.color.gray80};

    text-decoration: none;
    cursor: pointer;
  }

  .text {
    margin-bottom: 10px;
  }

  .container .divider {
    border-left: 1px solid #ccc;
    height: 15px;
  }

  .kakao-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    text-decoration: none;

    .kakao-img {
      width: 20px;
      height: 20px;
    }
  }
`;

export default Login;
