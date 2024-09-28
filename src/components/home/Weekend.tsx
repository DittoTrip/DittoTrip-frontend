import styled from 'styled-components';
import { DittoData } from '../../models/mainpage/mainpage';
import { defaultImage } from '../../constants/constant';
interface Props {
  data: DittoData;
}

const Weekend = ({ data }: Props) => {
  return (
    <WeekendStyled mainImg={data.imagePath ?? defaultImage}>
      <div className="main-img">
        <div className="main-title">{data.title}</div>
        <div className="main-content">{data.body}</div>
      </div>
    </WeekendStyled>
  );
};

const WeekendStyled = styled.div<{ mainImg: string }>`
  width: 100%;
  aspect-ratio: 1;
  text-align: left;

  .main-img {
    position: relative;
    height: 100%;
    width: 100%;

    border-radius: 12px;
    background-image: url(${({ mainImg }) => mainImg});
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
