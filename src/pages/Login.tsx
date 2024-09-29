import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { login } from '../api/auth';
import { useAuthStore } from '../store/authStore';

import AppBar from '../components/common/AppBar';
import Button from '../components/common/Button';
import InputText from '../components/Login/InputText';
import kakaoImg from '../assets/kakao.png';
import { LoginProps } from '../models/login/loginModel';
import { useTranslation } from 'react-i18next';
import LangSelectButton from '../components/LangSelectButton';

import logo from '../assets/Ditto_logo.png';
import HeaderToken from '../api/https';

const Login = () => {
  const navigate = useNavigate();
  const { storeLogin, storeLogout } = useAuthStore();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    console.log(data);
    storeLogout();
    HeaderToken.set('', '');
    login(data).then(
      res => {
        storeLogin(res.accessToken, res.refreshToken);
        console.log(res);
        navigate('/');
      },
      error => {
        console.log(error);
        alert(t('message.loginFail'));
      }
    );
  };

  return (
    <LoginStyle>
      <div className="app-bar">
        <AppBar
          leading={false}
          title={
            <div className="title">
              <img className="logo" src={logo} />
              Ditto Trip
            </div>
          }
          action={
            <div className="action">
              <LangSelectButton />
            </div>
          }
        />
      </div>
      <div className="guide-title">
        {t('login.welcome')}
        <br />
        {t('login.suggest')}
      </div>

      <form className="input" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <InputText placeholder={t('login.email')} inputType="email" {...register('email', { required: true })} />
          {errors.email && <p className="error-text">이메일을 입력해주세요</p>}
        </fieldset>
        <fieldset>
          <InputText
            placeholder={t('login.password')}
            inputType="password"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="error-text">비밀번호를 입력해주세요</p>}
        </fieldset>
        <fieldset>
          <Button type="submit" size="large" scheme="keyButton">
            {t('login.login')}
          </Button>
        </fieldset>
      </form>

      <div className="container">
        <div className="find-pw">
          <a href="/find-password">{t('login.findPassword')}</a>
        </div>
        <div className="divider"></div>
        <div className="join">
          <a href="/join">{t('login.join')}</a>
        </div>
      </div>
      <div className="text">{t('login.or')}</div>
      <Button size="large" scheme="kakao">
        <a href="http://dittotrip.site/oauth2/authorization/kakao" className="kakao-button">
          <img src={kakaoImg} alt="카카오" className="kakao-img" />
          {t('login.kakaoLogin')}
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

  .app-bar {
    .title {
      display: flex;
      gap: 14px;
      align-items: center;
      color: ${({ theme }) => theme.color.keyColor};
      ${({ theme }) => theme.font.body1}
      font-weight: bold;

      .logo {
        width: 33px;
      }
    }
  }

  .guide-title {
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
      ${({ theme }) => theme.font.body5}
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
