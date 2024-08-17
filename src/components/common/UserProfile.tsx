import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import profileImg from '../../assets/profile.png';
import Dot from '../common/Dot';

const UserProfile = () => {
  const name = '앞구르기뒷구르기';
  const date = '24.05.05';
  const reviewCount = 24;

  return (
    <UserProfileStyle>
      <div className="review-header">
        <img className="reviewer-img" src={profileImg} alt="프로필" />

        <div className="reviewer-details">
          <div className="reviewer-name">{name}</div>
          <div className="review-meta">
            <div className="review-date">{date}</div>
            <Dot />
            <div className="review-count">{reviewCount}개의 리뷰</div>
          </div>
        </div>

        <div className="review-actions">
          <FontAwesomeIcon className="icon" icon={faEllipsis} onClick={() => {}} />
        </div>
      </div>
    </UserProfileStyle>
  );
};

const UserProfileStyle = styled.div`
  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    .reviewer-img {
      width: 40px;
      height: 40px;
    }

    .reviewer-details {
      display: flex;
      flex-direction: column;
      flex: 1;

      .reviewer-name {
        ${({ theme }) => theme.font.body2}
      }

      .review-meta {
        display: flex;
        align-items: center;
        gap: 4px;

        .review-date {
          color: ${({ theme }) => theme.color.gray60};
        }
        .review-count {
          color: ${({ theme }) => theme.color.gray60};
        }
      }
    }

    .review-actions {
      path {
        color: ${({ theme }) => theme.color.gray40};
      }
    }
  }
`;

export default UserProfile;
