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

import useSpotDetail from '../hooks/useSpot';
import ErrorPage from './Error';

const handleHeartClick = () => {};

const Spot = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { spotDetailData, error, loading } = useSpotDetail(id!);

  if (loading) return <ErrorPage message={'Loading'} />;
  else if (error) return <ErrorPage message={'spot id를 확인해주세요'} />;

  return (
    <SpotStyle>
      <img className="main-img" src="https://img.seoul.co.kr/img/upload/2022/09/29/SSI_20220929234320_O2.jpg" />
      <div className="content-wrapper">
        <div className="content-name">{spotDetailData?.spotData.name}</div>

        <div className="spot-name-button">
          <div className="spot-name">{spotDetailData?.spotData.name}</div>
          <div className="button-wrapper">
            <div className="heart">
              <FontAwesomeIcon
                icon={spotDetailData?.spotData.myBookmarkId ? faHeart : faEmptyHeart}
                onClick={() => handleHeartClick()}
              />
            </div>
            <Button size={'small'} scheme={'keyButton'}>
              {t('spot.visit')}
            </Button>
          </div>
        </div>

        <div className="spot-address">{spotDetailData?.spotData.address}</div>

        <TagSlide tagList={spotDetailData?.spotData.hashtags} />

        <div className="stillcut-wrapper">
          <div className="spot-subtitle"> {t('spot.stillCut')}</div>
          <PhotoSlide photoList={spotDetailData?.spotImageDataList} width={112} height={76} gap={16} />
        </div>

        <div className="reviews">
          <div className="review-head">
            <Link to={`/review/${spotDetailData?.spotData.spotId}`} className="review-movement">
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
          {spotDetailData?.reviewDataList.map(review => (
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

        <Link to={`/around/${spotDetailData?.spotData.spotId}`} className="show-more">
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
    height: 300px;
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
