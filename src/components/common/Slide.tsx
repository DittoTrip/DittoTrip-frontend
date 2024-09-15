import styled from 'styled-components';
import ContentItem from '../category/ContentItem';
import { CategoryData } from '../../models/category/categoryModel';
import { useEffect, useState } from 'react';
import { defaultImage } from '../../constants/constant';

interface Props {
  carouselList: CategoryData[];
  isFavorite?: boolean;
  onEndReached: () => void;
}

const Slide = ({ carouselList, isFavorite, onEndReached }: Props) => {
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (isEnd) {
      onEndReached();
      setIsEnd(false); // 초기화
    }
  }, [isEnd, onEndReached]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.scrollLeft + target.clientWidth >= target.scrollWidth - 1) {
      setIsEnd(true);
    }
  };

  const filteredList = isFavorite ? carouselList.filter(item => item.myBookmarkId !== null) : carouselList;

  return (
    <SlideStyled>
      {filteredList?.length === 0 && (
        <div className="empty-container">{isFavorite ? '즐겨찾기를 추가해보세요!' : '데이터가 없습니다!'}</div>
      )}
      <div className="slide" onScroll={handleScroll}>
        {filteredList?.map((item, idx) => (
          <ContentItem key={idx} img={item.imageFilePath ?? defaultImage} name={item.name} id={item.categoryId} />
        ))}
      </div>
    </SlideStyled>
  );
};

const SlideStyled = styled.div`
  min-height: 165px;
  display: flex;
  align-items: center;

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
  .empty-container {
    color: ${({ theme }) => theme.color.gray60};
  }
`;

export default Slide;
