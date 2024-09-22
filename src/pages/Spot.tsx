import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import TagSlide from '../components/common/TagSlide';
import PhotoSlide from '../components/common/PhotoSlide';
import Button from '../components/common/Button';
import MiniReviewItem from '../components/review/MiniReviewItem';

import ErrorPage from './Error';
import useSpotDetail from '../hooks/spot/useSpotDetail';
import { useEffect, useState } from 'react';
import useBookmarkedSpot from '../hooks/spot/useSpotLike';
import useVisitedSpot from '../hooks/spot/useSpotVisit';
import { ReviewData } from '../models/spot/spotModel';
import { defaultImage } from '../constants/constant';

const Spot = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  // 북마크 관련 훅, 상태
  // bookmardId 저장: 북마크 삭제에 필요
  const [bookmarkedId, setBookmarkedId] = useState<number | null>();
  const { isBookmarked, toggleBookmark } = useBookmarkedSpot(id!, bookmarkedId!);
  const handleHeartClick = () => {
    toggleBookmark();
  };

  // spotDetailData 받아오기
  // 새로운 북마크시 생성된 bookmarkId 저장해야함 (isBookmared 의존)
  const { spotDetailData, error, loading } = useSpotDetail(id!, isBookmarked!);
  useEffect(() => {
    setBookmarkedId(spotDetailData?.spotData.myBookmarkId);
  }, [spotDetailData]);

  const { isVisited, markSpotAsVisited } = useVisitedSpot(id!);
  console.log(isVisited);

  if (loading) return <ErrorPage message={'Loading'} type="loading" />;
  else if (error) return <ErrorPage message={'spot id를 확인해주세요'} type="error" />;

  return (
    <SpotStyle>
      <img className="main-img" src={spotDetailData?.spotData.imagePath ?? defaultImage} />
      <div className="content-wrapper">
        <div className="content-name">{spotDetailData?.spotData.name}</div>

        <div className="spot-name-button">
          <div className="spot-name">{spotDetailData?.spotData.name}</div>
          <div className="button-wrapper">
            <div className="heart">
              <FontAwesomeIcon icon={isBookmarked ? faHeart : faEmptyHeart} onClick={() => handleHeartClick()} />
            </div>
            <Button
              size={'small'}
              scheme={'keyButton'}
              onClick={() => {
                markSpotAsVisited();
              }}>
              {t('spot.visit')}
            </Button>
          </div>
        </div>

        <div className="spot-address">{spotDetailData?.spotData.address}</div>

        <div className="tag-wrapper">
          <TagSlide tagList={spotDetailData?.spotData.hashtags} />
        </div>

        <div className="stillcut-wrapper">
          <div className="spot-subtitle"> {t('spot.stillCut')}</div>
          <PhotoSlide
            photoList={spotDetailData?.spotImageDataList.map(item => item.imagePath)}
            width={112}
            height={76}
            gap={16}
          />
        </div>

        <div className="reviews">
          <div className="review-head">
            <Link to={`/reviews/${spotDetailData?.spotData.spotId}`} className="review-movement">
              <div className="spot-subtitle"> {t('spot.review')}</div>
              <FontAwesomeIcon icon={faChevronRight} onClick={() => handleHeartClick()} className="arrow-btn" />
            </Link>
            <div className="new-btn">
              <Link to={`/review/new/${spotDetailData?.spotData.spotId}`}>
                <Button size={'small'} scheme={'keyButton'} onClick={() => {}}>
                  {t('spot.write')}
                </Button>
              </Link>
            </div>
          </div>
          {spotDetailData?.reviewDataList.map((review: ReviewData) => (
            <Link to={`/review/${review.reviewId}`} key={review.reviewId} className="review-item">
              <MiniReviewItem
                userName={review.username}
                rating={review.rating}
                text={review.reviewBody}
                id={review.reviewId}
              />
            </Link>
          ))}
        </div>

        <Link
          to={`/around?mapX=${spotDetailData?.spotData.pointX}&mapY=${spotDetailData?.spotData.pointY}`}
          className="show-more">
          {t('spot.seeMore')}
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>
    </SpotStyle>
  );
};

const SpotStyle = styled.div`
  .main-img {
    width: 100%;
    aspect-ratio: 1;
  }
  .content-wrapper {
    margin: 29px 28px 16px 28px;

    .content-name {
      font-size: 12px;
      font-weight: bold;
    }

    .spot-name-button {
      display: flex;
      justify-content: space-between;

      margin-bottom: 6px;

      .spot-name {
        ${({ theme }) => theme.font.subTitle};
      }
      .button-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;

        .heart {
          font-size: 20px;
          path {
            color: ${({ theme }) => theme.color.keyColor};
          }
        }
      }
    }

    .spot-address {
      ${({ theme }) => theme.font.body5};
    }
    .tag-wrapper {
      margin: 10px 0;
    }

    .spot-subtitle {
      ${({ theme }) => theme.font.body2};
    }
    .reviews {
      .review-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;

        .review-movement {
          display: flex;
          align-items: center;
          gap: 8px;

          text-decoration: none;

          .arrow-btn {
            font-size: 12px;
          }
        }
      }
      .review-item {
        text-decoration: none;
      }
    }

    .stillcut-wrapper {
      margin-top: 17px;
      margin-bottom: 32px;
    }
    .show-more {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 28px;

      ${({ theme }) => theme.font.body4};
      font-weight: bold;
      color: ${({ theme }) => theme.color.gray60};
      text-decoration: none;
      path {
        color: ${({ theme }) => theme.color.gray60};
      }
    }
  }
`;

export default Spot;
