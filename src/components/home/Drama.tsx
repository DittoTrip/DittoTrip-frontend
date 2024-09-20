import styled from 'styled-components';
import { dramaItem } from '../../pages/Home';

interface Props {
  dramaList: dramaItem[];
}

const Drama = ({ dramaList }: Props) => {
  return (
    <DramaStyled>
      <ul className="drama-main">
        {dramaList?.map((item, i) => {
          return (
            <li key={i} className="drama-list">
              <div className="drama-box">
                <img className="drama-img" src={item.img}></img>
                <div className="drama-title">{item.title}</div>
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
  }

  .drama-title {
    font-size: 10px;
    word-spacing: -1px;
    margin-top: 5px;
    text-align: center;
  }
`;

export default Drama;
