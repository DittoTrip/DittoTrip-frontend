import styled from 'styled-components';
import mainImage from '../../assets/homemain.png';

const Weekend = () => {
  return (
    <WeekendStyled>
      <div className="main-img">
        <div className="main-title">"도깨비" 촬영지 강릉 주문진 방파제</div>
        <div className="main-content">
          도깨비 신부 김고은이 도깨비 공유를 불러낼면서 면장면을 만들어낸 장소로 유명한 이곳! 김고은이 어쩌구 저쩌구
        </div>
      </div>
    </WeekendStyled>
  );
};

const WeekendStyled = styled.div`
  width: 100%;
  aspect-ratio: 1;
  text-align: left;

  .main-img {
    position: relative;
    height: 100%;
    width: 100%;

    border-radius: 12px;
    background-image: url(${mainImage});
    background-size: cover;
  }

  .main-title {
    position: absolute;
    bottom: 62px;
    left: 13px;

    color: white;
    ${({ theme }) => theme.font.subTitle};

    width: 250px;

    margin: 9px;
    word-spacing: 0.1px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .main-content {
    position: absolute;
    bottom: 20px;
    left: 13px;

    margin: 0 9px;

    color: white;
    ${({ theme }) => theme.font.body4};
    line-height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export default Weekend;
