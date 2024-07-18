import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import InputText from '../components/Login/InputText';
import Button from '../components/common/Button';

import { login } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import kakaoImg from '../assets/kakao.png';
import { useTranslation } from 'react-i18next';
import LangSelectButton from '../components/LangSelectButton';

export interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { storeLogin } = useAuthStore();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    login(data).then(
      res => {
        storeLogin(res.token);
        alert('환영합니다!');
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
      <LangSelectButton />
      <div className="title">
        {t('login.welcome')}
        <br />
        {t('login.suggest')}
      </div>

      <form className="input" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <InputText placeholder={t('login.email')} inputType="email" {...register('email', { required: true })} />
          {errors.email && <p className="error-text">{t('login.enterEmail')} </p>}
        </fieldset>
        <fieldset>
          <InputText
            placeholder={t('login.password')}
            inputType="password"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="error-text">{t('login.enterPassword')}</p>}
        </fieldset>
        <fieldset>
          <Button type="submit" size="large" scheme="keyButton">
            {t('login.login')}
          </Button>
        </fieldset>
      </form>

      <div className="container">
        <div>
          <a href="/find-id">{t('login.findId')}</a>
        </div>
        <div className="divider"></div>
        <div>
          <a href="/find-password">{t('login.findPassword')}</a>
        </div>
        <div className="divider"></div>
        <div>
          <a href="/signup">{t('login.join')}</a>
        </div>
      </div>
      <div className="text">{t('login.or')}</div>

      <Button size="large" scheme="kakao">
        <img src={kakaoImg} alt="" className="kakao-img" />
        {t('login.kakaoLogin')}
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
  width: 100%;

  .title {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.subTitle}
    margin-bottom: 30px;
    text-align: left;
    width: 100%;
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

  .kakao-img {
    width: 20px;
    margin-right: 5px;
  }
`;

export default Login;
