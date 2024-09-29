import styled from 'styled-components';
import ContentItem from '../category/ContentItem';
import { CategoryData } from '../../models/category/categoryModel';
import { useEffect, useState } from 'react';
import { defaultImage } from '../../constants/constant';
import { useTranslation } from 'react-i18next';

interface Props {
  carouselList: CategoryData[];
  isFavorite?: boolean;
  onEndReached: () => void;
}

const Slide = ({ carouselList, isFavorite, onEndReached }: Props) => {
  const { t } = useTranslation();
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
        <div className="empty-container">{isFavorite ? t('category.addFavorite') : ''}</div>
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
    display: flex;
    box-sizing: border-box;
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
