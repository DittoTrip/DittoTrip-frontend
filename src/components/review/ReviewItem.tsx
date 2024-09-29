import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as Thumb } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as empyThumb, faComment } from '@fortawesome/free-regular-svg-icons';

import UserProfileWithComment from '../common/UserProfileWithComment';
import Star from '../common/Star';

import { ReviewData } from '../../models/reveiw/reviewModel';

import formatDate from '../../utils/formatDate';
import useReviewBookmark from '../../hooks/review/useReviewLike';

interface Props {
  review: ReviewData;
  setIsExpandedOption: React.Dispatch<React.SetStateAction<boolean>>;
}
const ReviewItem = ({ review, setIsExpandedOption }: Props) => {
  const navigate = useNavigate();

  const { isBookmarked, toggleBookmark, bookmarkCount } = useReviewBookmark(review.reviewId.toString(), review.likes);

  return (
    <ReviewItemStyle>
      <UserProfileWithComment
        userProfileData={review.userData.userProfileData}
        userId={review.userData.userId}
        name={review.userData.nickname}
        date={formatDate(review.createdDateTime)}
        setIsExpandedOption={setIsExpandedOption}
      />
      <div
        className="review-content"
        onClick={() => {
          navigate(`/review/${review.reviewId}`);
        }}>
        <div className="review-star">
          <Star rating={review.rating} showRatingValue={false} size={16} gap={4} color="keyColor" />
        </div>
        <div className="slide">
          {review.imagePaths.length != 0 &&
            review.imagePaths?.map(item => {
              return (
                <li className="review-img">
                  <img src={item} alt="" className="review-img" />
                </li>
              );
            })}
        </div>
        <div className="review-text">{review.reviewBody}</div>
      </div>
      <div className="review-info">
        <div className="count">
          <FontAwesomeIcon className="icon" icon={isBookmarked ? Thumb : empyThumb} onClick={toggleBookmark} />
          <div className="count-text"> {bookmarkCount}</div>
        </div>
        <div className="count">
          <FontAwesomeIcon className="icon" icon={faComment} />
          <div className="count-text">{review.commentsCount}</div>
        </div>
      </div>
    </ReviewItemStyle>
  );
};

const ReviewItemStyle = styled.div`
  padding-top: 24px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray40};

  .review-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .review-star {
      margin-bottom: 16px;
      margin-top: 4px;
    }

    .slide {
      overflow-x: scroll;
      display: grid;
      grid-auto-flow: column;
      list-style: none;
      gap: 14px;
      max-width: 100%;

      -ms-overflow-style: none; /* 인터넷 익스플로러 */
      scrollbar-width: none; /* 파이어폭스 */

      .review-img {
        width: 240px;
        height: 240px;
        border-radius: 12px;
      }
    }

    .slide::-webkit-scrollbar {
      display: none;
    }
    .review-text {
      padding: 20px 0 24px 0;
    }
  }
  .review-info {
    display: flex;
    gap: 24px;

    .count {
      align-items: center;
      display: flex;
      gap: 4px;
      .icon {
        path {
          color: ${({ theme }) => theme.color.subColor1};
        }
      }
      .count-text {
        color: ${({ theme }) => theme.color.gray80};
      }
    }
  }
`;

export default ReviewItem;
