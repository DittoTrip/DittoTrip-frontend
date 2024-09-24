import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';
import { CommentData } from '../../models/ditto/dittoModel';
import { useNavigate } from 'react-router';
import { UserProfileData } from '../../models/user/userModel';
import ProfileImg from './ProfileImg';

interface Props {
  userProfileData: UserProfileData;
  userId: number;
  name: string;
  date: string;
  following?: number | null;
  isMine?: boolean;
  toggleFollow?: () => void;
  comment?: CommentData;
  isParent?: boolean;
  isParentComment?: boolean;
  setIsExpandedOption: React.Dispatch<React.SetStateAction<boolean>>;
  setParentComment?: React.Dispatch<React.SetStateAction<CommentData | null>>;
}
const UserProfileWithComment = ({
  userProfileData,
  userId,
  name,
  date,
  following,
  isMine,
  toggleFollow,
  comment,
  setIsExpandedOption,
  setParentComment,
  isParentComment,
}: Props) => {
  const navigate = useNavigate();
  return (
    <UserProfileWithCommentStyle isParentComment={isParentComment}>
      <div className="profile-left">
        <ProfileImg userProfileData={userProfileData} width="42px" />
      </div>
      <div className="profile-right">
        <div className="profile-info">
          <div className="profile-details">
            <div className="nickname-wrapper">
              <div className="user-name" onClick={() => navigate(`/mypage/${userId}`)}>
                {name}
              </div>
              {/* 내 글이 아니고 팔로우 x - 디토에서만 보임*/}
              {isMine == false && following && (
                <>
                  <Button size={'small'} scheme={'keyButton'} onClick={toggleFollow}>
                    Following
                  </Button>
                </>
              )}
              {/* 내 글이 아니고 팔로우 o - 디토에서만 보임 */}
              {isMine == false && following == null && (
                <>
                  <Button size={'small'} scheme={'emptyKeyButton'} onClick={toggleFollow}>
                    Follow
                  </Button>
                </>
              )}
            </div>
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

        {comment && <div className="comment">{comment.body}</div>}
        {setParentComment && (
          <div className="parent" onClick={() => setParentComment(comment!)}>
            댓글달기
          </div>
        )}
      </div>
    </UserProfileWithCommentStyle>
  );
};

const UserProfileWithCommentStyle = styled.div<{ isParentComment?: boolean; comment?: CommentData }>`
  display: flex;
  gap: 12px;

  padding: ${({ comment }) => (comment ? '12px 5px' : '12px 0')};
  background-color: ${({ isParentComment }) => (isParentComment ? '#f0f8ff' : 'white')};

  border-radius: 12px;
  .profile-left {
    display: flex;
  }

  .user-img {
    width: 42px;
    height: 42px;
  }

  .profile-right {
    flex: 1;

    .profile-info {
      display: flex;
      justify-content: space-between;

      .nickname-wrapper {
        display: flex;
        gap: 8px;

        .user-name {
          ${({ theme }) => theme.font.body2}
        }
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

    .parent {
      color: ${({ theme }) => theme.color.gray80};
      margin-top: 4px;
    }
  }
`;

export default UserProfileWithComment;
