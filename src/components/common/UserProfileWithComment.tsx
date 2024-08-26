import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import profileImg from '../../assets/profile.png';

interface Props {
  name: string;
  date: string;
  setIsExpandedOption: (expanded: boolean) => void;
  comment?: string;
}
const UserProfileWithComment = ({ name, date, comment, setIsExpandedOption }: Props) => {
  return (
    <UserProfileWithCommentStyle>
      {/* 마이페이지 이동 필요   */}
      <div className="profile-left">
        <img className="user-img" src={profileImg} alt="프로필 이미지" />
      </div>
      <div className="profile-right">
        <div className="profile-info">
          <div className="profile-details">
            <div className="user-name">{name}</div>
            <div className="date">{date}</div>
          </div>

          <div className="actions">
            <FontAwesomeIcon
              className="icon"
              icon={faEllipsis}
              onClick={() => {
                setIsExpandedOption(true);
              }}
            />
          </div>
        </div>

        {comment && <div className="comment">{comment}</div>}
      </div>
    </UserProfileWithCommentStyle>
  );
};

const UserProfileWithCommentStyle = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;

  .user-img {
    width: 40px;
    height: 40px;
  }

  .profile-right {
    flex: 1;

    .profile-info {
      display: flex;
      justify-content: space-between;

      .user-name {
        ${({ theme }) => theme.font.body2}
      }

      .date {
        color: ${({ theme }) => theme.color.gray60};
      }
    }

    .actions {
      path {
        color: ${({ theme }) => theme.color.gray40};
      }
    }

    .comment {
      margin-top: 8px;
    }
  }
`;

export default UserProfileWithComment;
