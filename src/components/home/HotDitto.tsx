import styled from 'styled-components';
import { SpotData } from '../../models/mainpage/mainpage';

interface Props {
  dittoList: SpotData[];
}

const HotDitto = ({ dittoList }: Props) => {
  return (
    <HotDittoStyled>
      {dittoList.map((item, i) => {
        return (
          <div key={i} className="ditto-box">
            <img className="ditto-img" src={item.imagePath}></img>
            <div className="ditto-location">{item.categoryName}</div>
            <div className="ditto-title">{item.name}</div>
          </div>
        );
      })}
    </HotDittoStyled>
  );
};

const HotDittoStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  .ditto-box {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
  }

  .ditto-img {
    width: 100%;
    height: auto;
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

export default HotDitto;
