import { useState } from 'react';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/common/AppBar';
import LangSelectButton from '../components/LangSelectButton';
import ImageUploader from '../components/review/UploadImage';
import Star from '../components/common/Star';
import Button from '../components/common/Button';

const NewReview = () => {
  const { t } = useTranslation();
  const [reviewText, setReviewText] = useState('');

  return (
    <NewReviewStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">리뷰 쓰기</div>} action={<LangSelectButton />} />
      </div>
      <div className="location-rating-card">
        <div className="spot-name">촬영지 이름</div>
        <Star rating={4.5} showRatingValue={false} color="keyColor" gap={12} size={28} />
      </div>

      <div className="review-input-box">
        <div className="input-title text-title">리뷰</div>
        <input
          type="text"
          className="review-text"
          placeholder={t('newReview.placeholder')}
          onChange={e => setReviewText(e.target.value)}
          value={reviewText}
        />
        <div className="text-length">({reviewText.length}/1000)</div>

        <div className="input-title photo-title">포토</div>
        <ImageUploader />
      </div>

      <div className="review-submit">
        <Button size="large" scheme="subButton" className="review-submit-button">
          작성 완료
        </Button>
      </div>
    </NewReviewStyle>
  );
};

const NewReviewStyle = styled.div`
  .app-bar .title {
    display: flex;
    justify-content: start;

    ${({ theme }) => theme.font.subTitle};
  }

  .location-rating-card {
    padding-top: 12px;
    padding-bottom: 24px;

    border-bottom: 1px solid ${({ theme }) => theme.color.gray20};

    .spot-name {
      text-align: center;
      margin-bottom: 8px;
      ${({ theme }) => theme.font.body2}
    }
  }

  .review-input-box {
    padding: 0 28px;

    .input-title {
      ${({ theme }) => theme.font.body1};
    }

    .text-title {
      margin-top: 28px;
      margin-bottom: 12px;
    }

    .review-text {
      height: 200px;
      width: 100%;

      border-radius: 12px;
      border: none;
      outline: none;

      background-color: ${({ theme }) => theme.color.gray20};
    }

    .photo-title {
      margin-top: 5px;
      margin-bottom: 8px;
    }

    .text-length {
      text-align: right;
      color: ${({ theme }) => theme.color.gray60};
    }
  }

  .review-submit {
    position: fixed;
    bottom: 87px;
    left: 0;

    width: 100vw;
    padding: 0 28px;
  }
`;

export default NewReview;
