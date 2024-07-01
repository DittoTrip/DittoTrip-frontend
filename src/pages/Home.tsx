import { styled } from 'styled-components';

const Home = () => {
  return (
    <HomeStyle>
      <div className="title">HOME</div>
      <div className="subTitle">subTitle</div>
      <div className="body1">body1</div>
      <div className="body2">body2</div>
      <div className="body3">body3</div>
      <div className="body4">body4</div>
    </HomeStyle>
  );
};

const HomeStyle = styled.main`
  .title {
    color: ${({ theme }) => theme.color.keyColor};
    ${({ theme }) => theme.font.title}
  }
  .subTitle {
    color: ${({ theme }) => theme.color.subColor1};
    ${({ theme }) => theme.font.subTitle}
  }
  .body1 {
    color: ${({ theme }) => theme.color.subColor2};
    ${({ theme }) => theme.font.body1}
  }
  .body2 {
    color: ${({ theme }) => theme.color.subColor2};
    ${({ theme }) => theme.font.body2}
  }
  .body3 {
    color: ${({ theme }) => theme.color.subColor2};
    ${({ theme }) => theme.font.body3}
  }
  .body4 {
    color: ${({ theme }) => theme.color.subColor2};
    ${({ theme }) => theme.font.body4}
  }
`;

export default Home;
