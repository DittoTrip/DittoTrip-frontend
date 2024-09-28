import styled from 'styled-components';
import DittoItem from './DittoItem';
import { CategorySearchPageData } from '../../models/category/categoryModel';

interface Props {
  carouselDittoList: CategorySearchPageData[];
}

const DittoSlide = ({ carouselDittoList }: Props) => {
  return (
    <DittoSlideStyled>
      <ul className="slide">
        {carouselDittoList?.map(item => {
          return (
            <li>
              <DittoItem img={item.imagePath} title={item.name}></DittoItem>
            </li>
          );
        })}
      </ul>
    </DittoSlideStyled>
  );
};

const DittoSlideStyled = styled.div`
  .slide {
    display: flex;
    list-style: none;
    gap: 16px 5px;
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
