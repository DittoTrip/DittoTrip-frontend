import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useReviewList from '../hooks/review/useReviewList';
import { styled } from 'styled-components';

import AppBar from '../components/common/AppBar';
import Tap from '../components/common/Tab';
import { TapItem } from './Category';

import Star from '../components/common/Star';
import ReviewItem from '../components/review/ReviewItem';
import DropDown from '../components/common/DropDown';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import ErrorPage from './Error';

import { defaultPageOptions } from '../constants/constant';
import { ReviewData } from '../models/reveiw/reviewModel';
import ScrollToTopButton from '../components/common/ScrollToTopBtn';

export interface OptionItem {
  id: number;
  text: string;
  sort?: string;
  handleClick: () => void;
}

const Review = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

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
      sort: 'rating,desc',
      handleClick: () => {
        setSelectedSortId(2);
        setIsOpen(false);
      },
    },
    {
      id: 3,
      text: t('review.reviewSortOptions.lowest'),
      sort: 'rating,asc',
      handleClick: () => {
        setSelectedSortId(3);
        setIsOpen(false);
      },
    },
  ];

  // 드롭다운
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSortId, setSelectedSortId] = useState(reviewSortOptions[0].id);
  // 수정, 삭제, 신고 옵션
  const [isExpandedOptions, setIsExpandedOptions] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewData>();

  const [currentPage, setCurrentPage] = useState(0);

  const { reviewList, rating, reviewsCount, loading, error, hasMore, handleDeleteReview } = useReviewList(
    id!,
    reviewSortOptions[selectedSortId].sort!,
    currentPage,
    defaultPageOptions
  );

  const expandedMyOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.modify'),
      handleClick: () => {
        navigate(`/review/edit?review=${selectedReview!.reviewId.toString()}`);
      },
    },
    {
      id: 0,
      text: t('bottomsheet.delete'),
      handleClick: () => {
        handleDeleteReview(selectedReview!.reviewId.toString());
        setIsOpen(false);
      },
    },
  ];

  const expandedOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.report'),
      handleClick: () => {
        navigate(`/report/REVIEW/${selectedReview!.reviewId.toString()}`);
      },
    },
  ];

  const tapData: TapItem[] = [
    {
      id: 0,
      title: t('review.tap.total'),
      content: (
        <div>
          {reviewList!.map(review => (
            <ReviewItem
              review={review}
              setIsExpandedOption={() => {
                setSelectedReview(review);
                setIsExpandedOptions(true);
              }}
              key={review.reviewId}
            />
          ))}
        </div>
      ),
    },
    {
      id: 1,
      title: t('review.tap.comment'),
      content: (
        <div>
          {reviewList!
            .filter(review => review.imagePaths === null)
            .map(review => (
              <ReviewItem
                review={review}
                setIsExpandedOption={() => {
                  setSelectedReview(review);
                  setIsExpandedOptions(true);
                }}
                key={review.reviewId}
              />
            ))}
        </div>
      ),
    },
    {
      id: 2,
      title: t('review.tap.photo'),
      content: (
        <div>
          {reviewList!
            .filter(review => review.imagePaths !== null)
            .map(review => (
              <ReviewItem
                review={review}
                setIsExpandedOption={() => {
                  setSelectedReview(review);
                  setIsExpandedOptions(true);
                }}
                key={review.reviewId}
              />
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
    return <ErrorPage message={'Loading...'} type="loading" />;
  } else if (error) {
    return <ErrorPage message={'spot id를 확인해주세요'} type="error" />;
  }

  return (
    <ReviewListStyle>
      <ScrollToTopButton />
      <div className="app-bar">
        <AppBar
          leading={true}
          title={
            <div className="title">
              {t('review.title')}
              <div className="count">{`(${reviewsCount})`}</div>
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
      {isExpandedOptions && selectedReview && (
        <BottomSheet
          title={t('bottomsheet.viewDetail')}
          list={selectedReview.isMine ? expandedMyOptionsContent : expandedOptionsContent}
          setIsOpen={setIsExpandedOptions}
        />
      )}
    </ReviewListStyle>
  );
};

const ReviewListStyle = styled.div`
  .app-bar .title {
    display: flex;
    gap: 4px;
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
