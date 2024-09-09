import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import AppBar from '../components/common/AppBar';
import Tap from '../components/common/Tab';
import { TapItem } from './Category';

import Star from '../components/common/Star';
import ReviewItem from '../components/review/ReviewItem';
import DropDown from '../components/common/DropDown';
import BottomSheet from '../components/bottomsheet/BottomSheet';

import useReviewList from '../hooks/review/useReviewList';
import { defaultPageOptions } from '../constants/constant';
import ErrorPage from './Error';

export interface OptionItem {
  id: number;
  text: string;
  sort?: string;
  handleClick: () => void;
}

const Review = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const reviewSortOptions: OptionItem[] = [
    {
      id: 0,
      text: t('review.reviewSortOptions.newest'),
      sort: 'createdDateTime,desc',
      handleClick: () => {
        setSelectedSortId(0);
        setIsOpen(false);
      },
    },
    {
      id: 1,
      text: t('review.reviewSortOptions.oldest'),
      sort: 'createdDateTime,asc',
      handleClick: () => {
        setSelectedSortId(1);
        setIsOpen(false);
      },
    },
    {
      id: 2,
      text: t('review.reviewSortOptions.highest'),
      sort: 'rating,asc',
      handleClick: () => {
        setSelectedSortId(2);
        setIsOpen(false);
      },
    },
    {
      id: 3,
      text: t('review.reviewSortOptions.lowest'),
      sort: 'rating,desc',
      handleClick: () => {
        setSelectedSortId(3);
        setIsOpen(false);
      },
    },
  ];

  const expandedOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.modify'),
      handleClick: () => {
        alert('modify');
      },
    },
    {
      id: 0,
      text: t('bottomsheet.delete'),
      handleClick: () => {
        alert('delete');
      },
    },
    {
      id: 0,
      text: t('bottomsheet.report'),
      handleClick: () => {
        alert('report');
      },
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSortId, setSelectedSortId] = useState(reviewSortOptions[0].id);
  const [isExpandedOptions, setIsExpandedOptions] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const { reviewList, rating, reviewsCount, loading, error, hasMore } = useReviewList(
    id!,
    reviewSortOptions[selectedSortId].sort!,
    currentPage,
    defaultPageOptions
  );

  const tapData: TapItem[] = [
    {
      id: 0,
      title: t('review.tap.total'),
      content: (
        <div>
          {/* Tab 1: Show all reviews */}
          {reviewList.map(review => (
            <ReviewItem review={review} setIsExpandedOption={setIsExpandedOptions} key={review.reviewId} />
          ))}
        </div>
      ),
    },
    {
      id: 1,
      title: t('review.tap.comment'),
      content: (
        <div>
          {/* Tab 2: Show reviews where imagePath is null */}
          {reviewList
            .filter(review => review.imagePaths === null)
            .map(review => (
              <ReviewItem review={review} setIsExpandedOption={setIsExpandedOptions} key={review.reviewId} />
            ))}
        </div>
      ),
    },
    {
      id: 2,
      title: t('review.tap.photo'),
      content: (
        <div>
          {/* Tab 3: Show reviews where imagePath is not null */}
          {reviewList
            .filter(review => review.imagePaths !== null)
            .map(review => (
              <ReviewItem review={review} setIsExpandedOption={setIsExpandedOptions} key={review.reviewId} />
            ))}
        </div>
      ),
    },
  ];
  const [selectedTapId, setSelectedTapId] = useState<number>(tapData[0]?.id);

  // Infinite scroll
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore && !loading) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading && currentPage === 0) {
    return <ErrorPage message={'Loading...'} />;
  } else if (error) {
    return <ErrorPage message={'spot id를 확인해주세요'} />;
  }

  return (
    <ReviewStyle>
      <div className="app-bar">
        <AppBar
          leading={true}
          title={
            <div className="title">
              {t('review.title')}
              <div className="count"> {reviewsCount}</div>
            </div>
          }
          action={<div></div>}
        />
      </div>
      <div className="star-rating">
        <Star rating={rating!} showRatingValue={true} color={'keyColor'} gap={8} size={24} />
      </div>
      <div className="tap">
        <Tap tapData={tapData} selectedId={selectedTapId} setSelectedId={setSelectedTapId} />
      </div>
      <div className="dropdown">
        <DropDown setIsOpen={() => setIsOpen(true)} value={reviewSortOptions[selectedSortId]} />
      </div>
      <div className="content">{tapData[selectedTapId].content}</div>
      {isOpen && (
        <BottomSheet
          title={t('bottomsheet.sort')}
          list={reviewSortOptions}
          setIsOpen={setIsOpen}
          selectedSortId={selectedSortId}
        />
      )}
      {isExpandedOptions && (
        <BottomSheet
          title={t('bottomsheet.viewDetail')}
          list={expandedOptionsContent}
          setIsOpen={setIsExpandedOptions}
          selectedSortId={-1}
        />
      )}
    </ReviewStyle>
  );
};

const ReviewStyle = styled.div`
  .app-bar .title {
    display: flex;
    ${({ theme }) => theme.font.subTitle};

    .count {
      color: ${({ theme }) => theme.color.gray60};
    }
  }
  .star-rating {
    margin-top: 8px;
  }
  .tap {
    margin-top: 4px;
  }

  .dropdown {
    display: flex;
    justify-content: start;

    margin: 10px 28px 0 28px;
  }

  .content {
    margin: 0 28px;
  }
`;

export default Review;
