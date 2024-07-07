import { styled } from 'styled-components';
import InputText from '../components/Login/InputText';
import Button from '../components/common/Button';

import kakaoImg from '../assets/kakao.png';

const Login = () => {
  return (
    <LoginStyle>
      <div className="title">
        어서오세요
        <br />
        오늘은 무슨 디토를 해볼까요?
      </div>
      <div className="input">
        <InputText placeholder="이메일" inputType="email" />
        <InputText placeholder="비밀번호" inputType="password" />
        <Button size="large" scheme="keyButton">
          로그인
        </Button>
      </div>

      <div className="container">
        <div>
          <a href="/find-id">아이디 찾기</a>
        </div>
        <div className="divider"></div>
        <div>
          <a href="/find-password">비밀번호 찾기</a>
        </div>
        <div className="divider"></div>
        <div>
          <a href="/signup">회원가입</a>
        </div>
      </div>
      <div className="text">또는</div>
      <Button size="large" scheme="kakao">
        <img src={kakaoImg} alt="" className="kakao-img" />
        카카오톡 로그인
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
