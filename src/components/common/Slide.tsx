import styled from 'styled-components';
import { contentItem } from '../../pages/Category';
import ContentItem from '../category/ContentItem';

interface Props {
  carouselList: contentItem[];
}

const Slide = ({ carouselList }: Props) => {
  return (
    <SlideStyled>
      <ul className="slide">
        {carouselList?.map(item => {
          return (
            <li>
              <ContentItem img={item.img} name={item.name}></ContentItem>
            </li>
          );
        })}
      </ul>
    </SlideStyled>
  );
};

const SlideStyled = styled.div`
  .slide {
    overflow-x: scroll;
    display: grid;
    grid-auto-flow: column;
    padding: 10px 16px;
    margin-top: 8px;
    box-sizing: border-box;
    grid-template-rows: repeat(1, auto);
    grid-auto-columns: calc(33.3333% - 3.33333px);
    gap: 24px 5px;
    list-style: none;

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */

    li {
    }
  }

  .carousel::-webkit-scrollbar {
    display: none;
  }
`;

export default Slide;
