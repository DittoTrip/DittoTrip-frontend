import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import profileImg from '../../assets/profile.png';
import { ReviewCommentData } from '../../models/reveiw/reviewModel';
import Button from './Button';
import { DittoCommentData } from '../../models/ditto/dittoModel';

interface Props {
  name: string;
  date: string;
  following?: boolean;
  comment?: ReviewCommentData | DittoCommentData;
  isParent?: boolean;
  isParentComment?: boolean;
  setIsExpandedOption: (expanded: boolean) => void;
  setParentComment?: (parentComment: ReviewCommentData | DittoCommentData) => void;
}
const UserProfileWithComment = ({
  name,
  date,
  following,
  comment,
  setIsExpandedOption,
  setParentComment,
  isParentComment,
}: Props) => {
  return (
    <UserProfileWithCommentStyle isParentComment={isParentComment}>
      <div className="profile-left">
        <img className="user-img" src={profileImg} alt="프로필 이미지" />
      </div>
      <div className="profile-right">
        <div className="profile-info">
          <div className="profile-details">
            <div className="nickname-wrapper">
              <div className="user-name">{name}</div>
              {following && (
                <>
                  <Button size={'small'} scheme={'keyButton'}>
                    Follow
                  </Button>
                  <Button size={'small'} scheme={'emptyKeyButton'}>
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

const UserProfileWithCommentStyle = styled.div<{ isParentComment?: boolean; comment?: ReviewCommentData }>`
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
