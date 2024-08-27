import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import TagSlide from '../components/common/TagSlide';
import PhotoSlide from '../components/common/PhotoSlide';
import Button from '../components/common/Button';
import MiniReviewItem from '../components/review/MiniReviewItem';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const spotDetails = {
  contentTitle: '이상한 변호사 우영우',
  spotName: '소덕동 팽나무',
  address: '경상남도 창원시 의창구 대산면 대산북로 899번길 43-5',
  tagList: ['강동원', '변성은', '디토트립', '강원도', '변호사', '변성은', '디토리포', '여행'],
  photoList: [
    'https://img.seoul.co.kr/img/upload/2022/09/29/SSI_20220929234320_O2.jpg',
    'https://img.seoul.co.kr/img/upload/2022/09/29/SSI_20220929234320_O2.jpg',
    'https://img.seoul.co.kr/img/upload/2022/09/29/SSI_20220929234320_O2.jpg',
    'https://img.seoul.co.kr/img/upload/2022/09/29/SSI_20220929234320_O2.jpg',
    'https://img.seoul.co.kr/img/upload/2022/09/29/SSI_20220929234320_O2.jpg',
    'https://img.seoul.co.kr/img/upload/2022/09/29/SSI_20220929234320_O2.jpg',
    'https://img.seoul.co.kr/img/upload/2022/09/29/SSI_20220929234320_O2.jpg',
  ],
  isLiked: true,
  reviewList: [
    {
      id: 1,
      userName: 'user1',
      rating: 4.5,
      text: '부모님과 다녀왔다. 또 오고싶다. 나무가 너무 멋있다.',
    },
    {
      id: 2,
      userName: 'user2',
      rating: 2.5,
      text: '친구들과 다녀왔다. 또 오고싶다. 나무가 너무 멋있다.',
    },
    {
      id: 3,
      userName: 'user3',
      rating: 4.0,
      text: '부모님과 다녀왔다. 또 오고싶다. 나무가 너무 멋있다.',
    },
    {
      id: 4,
      userName: 'user4',
      rating: 5.0,
      text: '살면서 봤던 나무중에 가장 멋있다. 드라마에서 본 곳을 와서 기분이 좋다.살면서 봤던 나무중에 가장 멋있다. 드라마에서 본 곳을 와서 기분이 좋다. 살면서 봤던 나무중에 가장 멋있다. ',
    },
  ],
};
const handleHeartClick = () => {};

const Spot = () => {
  const { t } = useTranslation();

  return (
    <SpotStyle>
      <img className="main-img" src="https://img.seoul.co.kr/img/upload/2022/09/29/SSI_20220929234320_O2.jpg" />
      <div className="content-wrapper">
        <div className="content-name">{spotDetails.contentTitle}</div>

        <div className="spot-name-button">
          <div className="spot-name">{spotDetails.spotName}</div>
          <div className="button-wrapper">
            <div className="heart">
              <FontAwesomeIcon icon={spotDetails.isLiked ? faHeart : faEmptyHeart} onClick={() => handleHeartClick()} />
            </div>
            <Button size={'small'} scheme={'keyButton'}>
              {t('spot.visit')}
            </Button>
          </div>
        </div>

        <div className="spot-address">{spotDetails.address}</div>

        <TagSlide tagList={spotDetails.tagList} />

        <div className="stillcut-wrapper">
          <div className="spot-subtitle"> {t('spot.stillCut')}</div>
          <PhotoSlide photoList={spotDetails.photoList} width={112} height={76} gap={16} />
        </div>

        <div className="reviews">
          <div className="review-head">
            <div className="review-movement">
              <div className="spot-subtitle"> {t('spot.review')}</div>
              <FontAwesomeIcon icon={faChevronRight} onClick={() => handleHeartClick()} className="arrow-btn" />
            </div>
            <div className="new-btn">
              <Link to="/review/new">
                <Button size={'small'} scheme={'keyButton'} onClick={() => {}}>
                  {t('spot.write')}
                </Button>
              </Link>
            </div>
          </div>
          {spotDetails.reviewList.map(review => (
            <Link to={`/review/${review.id}`} key={review.id} className="review-item">
              <MiniReviewItem userName={review.userName} rating={review.rating} text={review.text} id={review.id} />
            </Link>
          ))}
        </div>

        <div className="show-more">
          {t('spot.seeMore')}
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
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
    margin: 29px 28px 0 28px;

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
      gap: 4px;
      margin-top: 28px;

      align-items: center;
      ${({ theme }) => theme.font.body4};
      font-weight: bold;
      color: ${({ theme }) => theme.color.gray60};
      path {
        color: ${({ theme }) => theme.color.gray60};
      }
    }
  }
`;

export default Spot;
