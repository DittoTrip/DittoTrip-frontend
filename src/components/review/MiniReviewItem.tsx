import { styled } from 'styled-components';
import profileImg from '../../assets/profile.png';
import Star from '../common/Star';

interface ReviewDummy {
  id: number;
  userName: string;
  rating: number;
  text: string;
}

const MiniReviewItem = ({ userName, rating, text }: ReviewDummy) => {
  return (
    <MiniReviewItemStyle>
      <div className="review-info-wrapper">
        <div className="user-info">
          <div className="user-img">
            <img src={profileImg} />
          </div>
          <div className="user-name">{userName}</div>
        </div>

        <div className="rating-wrapper">
          <div className="rating-text">{rating}</div>
          <div className="star">
            <Star rating={rating} size={14} gap={1} />
          </div>
        </div>
      </div>

      <div className="text">{text}</div>
    </MiniReviewItemStyle>
  );
};

const MiniReviewItemStyle = styled.div`
  padding: 12px 8px 10px 8px;
  margin-bottom: 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.gray20};
  ${({ theme }) => theme.font.body4}

  .review-info-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 13px;

    .rating-wrapper {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;

    .user-img {
      width: 28px;
      height: 28px;
      img {
        width: 100%;
      }
    }
  }

  .text {
    padding: 5px 9px;

    background-color: ${({ theme }) => theme.color.background};
    border-radius: 6px;
    ${({ theme }) => theme.font.body6}

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

export default MiniReviewItem;
