import styled from 'styled-components';
import { CategoryData } from '../../models/mainpage/mainpage';
import { useNavigate } from 'react-router-dom';

interface Props {
  dramaList: CategoryData[];
}

const Drama = ({ dramaList }: Props) => {
  const navigate = useNavigate();

  return (
    <DramaStyled>
      <ul className="drama-main">
        {dramaList?.map((item, i) => {
          return (
            <li key={i} className="drama-list">
              <div className="drama-box" onClick={() => navigate(`/spot/list/${item.categoryId}`)}>
                <img className="drama-img" src={item.imagePath}></img>
                <div className="drama-title">{item.name}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </DramaStyled>
  );
};

const DramaStyled = styled.div`
  .drama-main {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    padding: 0;
  }

  .drama-list {
    list-style: none;
  }

  .drama-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .drama-img {
    width: 90%;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
  }

  .drama-title {
    font-size: 10px;
    word-spacing: -1px;
    margin-top: 5px;
    text-align: center;
  }
`;

export default Drama;
