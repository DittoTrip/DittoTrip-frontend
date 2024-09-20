import styled from 'styled-components';
import { DittoMiniData } from '../../models/ditto/dittoModel';
import { defaultImage } from '../../constants/constant';
import { useNavigate } from 'react-router-dom';
interface Props {
  dittoList: DittoMiniData[];
}

const DittoInfinity = ({ dittoList }: Props) => {
  const navigate = useNavigate();
  return (
    <DittoInfinitystyle>
      {
        <div className="content-wrapper">
          {dittoList.map((item, i) => {
            return (
              <div key={i} className="ditto-box" onClick={() => navigate(`/ditto/${item.dittoId}`)}>
                <img className="content-img" src={item.imagePath ?? defaultImage}></img>
                <div className="title-box">
                  <div className="location">{item.title}</div>
                  <div className="name">{item.userData.nickname}</div>
                </div>
              </div>
            );
          })}
        </div>
      }
    </DittoInfinitystyle>
  );
};

const DittoInfinitystyle = styled.div`
  .content-wrapper {
    margin: 8px 28px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

  @media (max-width: 768px) {
    .content-wrapper {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 300px) {
    .content-wrapper {
      grid-template-columns: repeat(1, 1fr); /* 아주 작은 화면에서는 1줄로 변경 */
    }
  }
`;

export default DittoInfinity;
