import styled from 'styled-components';
import SearchItem from '../search/SearchItem';

interface Props {
  carouselTextList: string[];
}

const TextSlide = ({ carouselTextList }: Props) => {
  return (
    <TextSlideStyled>
      <ul className="slide">
        {carouselTextList?.map(item => {
          return (
            <li>
              <SearchItem title={item} />
            </li>
          );
        })}
      </ul>
    </TextSlideStyled>
  );
};

const TextSlideStyled = styled.div`
  .slide {
    display: flex;
    list-style: none;
    gap: 24px 8px;
    margin: 0;
    padding: 10px 0;
    overflow-x: scroll;
    white-space: nowrap;

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }

  .slide::-webkit-scrollbar {
    display: none;
  }
`;

export default TextSlide;
