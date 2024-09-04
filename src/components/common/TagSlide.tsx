import { styled } from 'styled-components';
import Tag from './Tag';

interface Props {
  tagList?: string[];
}

const TagSlide = ({ tagList }: Props) => {
  return (
    <TagSlideStyled>
      <ul className="tag-slide">
        {tagList?.map((item, idx) => {
          return (
            <li key={idx}>
              <Tag text={item} />
            </li>
          );
        })}
      </ul>
    </TagSlideStyled>
  );
};

const TagSlideStyled = styled.div`
  .tag-slide {
    display: grid;
    grid-auto-flow: column;
    gap: 24px 8px;

    margin: 0;
    padding: 0;

    white-space: nowrap;
    overflow-x: scroll;
    list-style: none;

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
`;

export default TagSlide;
