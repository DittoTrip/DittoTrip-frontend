import styled from 'styled-components';
import { DittoMiniData } from '../../models/ditto/dittoModel';
import { defaultImage } from '../../constants/constant';
import { useNavigate } from 'react-router-dom';

interface Props {
  dittoList: DittoMiniData[];
  itemsPerRow: number;
}

const DittoInfinity = ({ dittoList, itemsPerRow }: Props) => {
  const navigate = useNavigate();
  return (
    <DittoInfinitystyle itemsPerRow={itemsPerRow}>
      <div className="content-wrapper">
        {dittoList.map((item, i) => (
          <div key={i} className="ditto-box" onClick={() => navigate(`/ditto/${item.dittoId}`)}>
            <img className="content-img" src={item.imagePath ?? defaultImage}></img>
            {itemsPerRow < 3 && (
              <div className="title-box">
                <div className="location">{item.title}</div>
                <div className="name">{item.userData.nickname}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </DittoInfinitystyle>
  );
};

const DittoInfinitystyle = styled.div<{ itemsPerRow: number }>`
  .content-wrapper {
    margin: 8px 28px;
    display: grid;
    grid-template-columns: repeat(${({ itemsPerRow }) => itemsPerRow}, 1fr);
    gap: 8px;
  }

  .ditto-box {
    position: relative;
    width: 100%;
    display: block;
    aspect-ratio: 1;
  }

  .content-img {
    border-radius: 15px;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .title-box {
    position: absolute;
    bottom: 10px;
    left: 10px;

    .location {
      ${({ theme }) => theme.font.body2}
      color: white;
    }
    .name {
      ${({ theme }) => theme.font.body5}
      color: white;
    }
  }
`;

export default DittoInfinity;
