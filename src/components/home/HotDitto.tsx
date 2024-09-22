import styled from 'styled-components';
import { dittoItem } from '../../pages/Home';

interface Props {
  dittoList: dittoItem[];
}

const HotDitto = ({ dittoList }: Props) => {
  return (
    <HotDittoStyled>
      {dittoList.map((item, i) => {
        return (
          <div key={i} className="ditto-box">
            <img className="ditto-img" src={item.img}></img>
            <div className="ditto-location">{item.location}</div>
            <div className="ditto-title">{item.title}</div>
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
