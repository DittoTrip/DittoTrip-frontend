import { styled } from 'styled-components';

const Home = () => {
  return (
    <HomeStyle>
      <div className="title">HOME</div>
      <div className="subTitle1">드라마 속 그곳! 어디지?</div>
      <div className="subTitle2">드라마 속 그곳! 어디지?</div>
    </HomeStyle>
  );
};

const HomeStyle = styled.main`
  .title {
    color: ${({ theme }) => theme.color.keyColor};
    font-weight: 800;
  }
  .subTitle1 {
    color: ${({ theme }) => theme.color.subColor1};
    font-weight: 600;
  }
  .subTitle2 {
    color: ${({ theme }) => theme.color.subColor2};
    font-weight: 500;
  }
`;

export default Home;
