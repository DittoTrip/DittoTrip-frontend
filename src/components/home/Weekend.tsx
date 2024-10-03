import styled from 'styled-components';
import { DittoData } from '../../models/mainpage/mainpage';
import { defaultImage } from '../../constants/constant';
import { useNavigate } from 'react-router-dom';
interface Props {
  data: DittoData;
}

const Weekend = ({ data }: Props) => {
  const navigate = useNavigate();
  return (
    <WeekendStyled $mainimg={data.imagePath ?? defaultImage}>
      <img className="main-img" src={data.imagePath} onClick={() => navigate(`/ditto/${data.dittoId}`)} />
      <div className="main-title">{data.title}</div>
      <div className="main-content">{data.body}</div>
    </WeekendStyled>
  );
};

const WeekendStyled = styled.div<{ $mainimg: string }>`
  position: relative;

  width: 100%;
  aspect-ratio: 1 / 1;
  text-align: left;

  cursor: pointer;

  .main-img {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;

    border-radius: 12px;
    object-fit: cover;
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
