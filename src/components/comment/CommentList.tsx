import { styled } from 'styled-components';
import UserProfileWithComment from '../common/UserProfileWithComment';
import { useTranslation } from 'react-i18next';
import { ReviewCommentData } from '../../models/reveiw/reviewModel';

const CommenList = ({ comments }: { comments: ReviewCommentData[] }) => {
  const { t } = useTranslation();
  return (
    <CommentListStyled>
      <div className="comment-title">{t('comment.comment')}</div>

      {comments?.map(comment => (
        <div key={comment.commentId}>
          <UserProfileWithComment
            name={comment.userData.userName}
            date={comment.createdDateTime.toString()}
            comment={comment.body}
            setIsExpandedOption={() => {}}
          />
          {comment.childrenCommentsDataList?.length > 0 && (
            <ChildrenCommentsStyled>
              {comment.childrenCommentsDataList.map(childComment => (
                <UserProfileWithComment
                  key={childComment.commentId}
                  name={childComment.userData.userName}
                  date={childComment.createdDateTime.toString()}
                  comment={childComment.body}
                  setIsExpandedOption={() => {}}
                />
              ))}
            </ChildrenCommentsStyled>
          )}
        </div>
      ))}
    </CommentListStyled>
  );
};

const CommentListStyled = styled.div`
  .comment-title {
    padding-top: 16px;
    padding-bottom: 8px;
    ${({ theme }) => theme.font.body2}
  }
`;

const ChildrenCommentsStyled = styled.div`
  margin-left: 43px;
`;

export default CommenList;
