import styled from 'styled-components';
import { SpotData } from '../../models/mainpage/mainpage';
import { useNavigate } from 'react-router-dom';

interface Props {
  dittoList: SpotData[];
}

const HotSpot = ({ dittoList }: Props) => {
  const navigate = useNavigate();

  return (
    <HotSpotStyled>
      {dittoList.map((item, i) => {
        return (
          <div key={i} className="ditto-box" onClick={() => navigate(`/spot/${item.spotId}`)}>
            <img className="ditto-img" src={item.imagePath}></img>
            <div className="ditto-location">{item.categoryName}</div>
            <div className="ditto-title">{item.name}</div>
          </div>
        );
      })}
    </HotSpotStyled>
  );
};

const HotSpotStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  .ditto-box {
    position: relative;
    width: 100%;
    aspect-ratio: 1;

    cursor: pointer;
  }

  .ditto-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }

  .ditto-location {
    position: absolute;
    bottom: 30px;
    margin: 0 10px;

    width: calc(100% - 20px);

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    color: white;
    ${({ theme }) => theme.font.body2};
  }

  .ditto-title {
    position: absolute;
    bottom: 12px;
    margin: 0 10px;

    width: calc(100% - 20px);

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    color: white;
    ${({ theme }) => theme.font.body4};
  }
`;

export default HotSpot;
