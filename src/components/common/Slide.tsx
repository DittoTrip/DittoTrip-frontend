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

export default Slide;
