import { styled } from 'styled-components';

const Login = () => {
  return (
    <LoginStyle>
      <div className="title">
        어서오세요
        <br />
        오늘은 무슨 디토를 해볼까요?
      </div>
    </LoginStyle>
  );
};

const LoginStyle = styled.div`
  .title {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.subTitle}
  }
`;

export default Login;
