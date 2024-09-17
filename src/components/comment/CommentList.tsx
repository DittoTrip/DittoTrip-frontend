import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import UserProfileWithComment from '../common/UserProfileWithComment';
import formatDate from '../../utils/formatDate';
import { CommentData } from '../../models/ditto/dittoModel';

interface Props {
  comments: CommentData[];
  setIsExpandedOption: React.Dispatch<React.SetStateAction<boolean>>;
  parentComment?: CommentData;
  setSelectedComment?: React.Dispatch<React.SetStateAction<CommentData | undefined>>;
  setParentComment?: React.Dispatch<React.SetStateAction<CommentData | null>>;
}
const CommenList = ({ comments, parentComment, setSelectedComment, setIsExpandedOption, setParentComment }: Props) => {
  const { t } = useTranslation();

  return (
    <CommentListStyled>
      <div className="comment-title">{t('comment.comment')}</div>

      {comments?.map(comment => (
        <div key={comment.commentId}>
          <UserProfileWithComment
            name={comment.userData.nickname}
            date={formatDate(comment.createdDateTime)}
            comment={comment}
            setIsExpandedOption={() => {
              if (setSelectedComment) {
                setSelectedComment(comment);
              }
              setIsExpandedOption(true);
            }}
            setParentComment={setParentComment}
            isParentComment={parentComment?.commentId === comment.commentId}
          />
          {comment.childCommentDataList?.length > 0 && (
            <ChildrenCommentsStyled>
              {comment.childCommentDataList.map(childComment => (
                <UserProfileWithComment
                  key={childComment.commentId}
                  name={childComment.userData.nickname}
                  date={formatDate(childComment.createdDateTime)}
                  comment={childComment}
                  setIsExpandedOption={() => {
                    if (setSelectedComment) {
                      setSelectedComment(childComment);
                    }
                    setIsExpandedOption(true);
                  }}
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
