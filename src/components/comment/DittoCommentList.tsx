import { styled } from 'styled-components';
import UserProfileWithComment from '../common/UserProfileWithComment';
import { useTranslation } from 'react-i18next';
import formatDate from '../../utils/formatDate';
import { DittoCommentData } from '../../models/ditto/dittoModel';
import { ReviewCommentData } from '../../models/reveiw/reviewModel';

interface Props {
  comments: DittoCommentData[];
  setIsExpandedOption: (expanded: boolean) => void;
  parentComment?: DittoCommentData;
  setSelectedComment?: (comment: DittoCommentData) => void;
  setParentComment?: (comment: DittoCommentData | ReviewCommentData) => void;
}
const CommentList = ({ comments, parentComment, setSelectedComment, setIsExpandedOption, setParentComment }: Props) => {
  const { t } = useTranslation();
  return (
    <CommentListStyled>
      <div className="comment-title">{t('comment.comment')}</div>

      {comments?.map(comment => (
        <div key={comment.dittoCommentId}>
          <UserProfileWithComment
            name={comment.userData.nickname}
            date={formatDate(comment.createdDateTime)}
            comment={comment}
            setIsExpandedOption={() => {
              setIsExpandedOption(true);
              if (setSelectedComment) {
                setSelectedComment(comment);
              }
            }}
            setParentComment={setParentComment}
            isParentComment={parentComment?.dittoCommentId === comment.dittoCommentId}
          />
          {comment.parentDittoCommentDataList?.length > 0 && (
            <ChildrenCommentsStyled>
              {comment.parentDittoCommentDataList.map(childComment => (
                <UserProfileWithComment
                  key={childComment.dittoCommentId}
                  name={childComment.userData.nickname}
                  date={formatDate(comment.createdDateTime)}
                  comment={childComment}
                  setIsExpandedOption={() => {
                    setIsExpandedOption(true);
                    if (setSelectedComment) {
                      setSelectedComment(comment);
                    }
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

export default CommentList;
