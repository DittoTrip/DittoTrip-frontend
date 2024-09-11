import styled from 'styled-components';
import DittoItem from './DittoItem';
import { dittoItem } from '../../pages/Search';

interface Props {
  carouselDittoList: dittoItem[];
}

const DittoSlide = ({ carouselDittoList }: Props) => {
  return (
    <DittoSlideStyled>
      <ul className="slide">
        {carouselDittoList?.map(item => {
          return (
            <li>
              <DittoItem img={item.img} title={item.title}></DittoItem>
            </li>
          );
        })}
      </ul>
    </DittoSlideStyled>
  );
};

const DittoSlideStyled = styled.div`
  .slide {
    display: grid;
    grid-auto-flow: column;
    box-sizing: border-box;
    grid-template-rows: repeat(1, auto);
    grid-auto-columns: calc(33.3333% - 3.33333px);
    list-style: none;
    gap: 24px 5px;
    margin: 0;
    padding: 10px 0;
    overflow-x: scroll;

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }

  .slide::-webkit-scrollbar {
    display: none;
  }
`;

export default DittoSlide;
