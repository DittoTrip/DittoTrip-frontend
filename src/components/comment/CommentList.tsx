import { styled } from 'styled-components';
import UserProfileWithComment from '../common/UserProfileWithComment';
import { useTranslation } from 'react-i18next';

const CommenList = () => {
  const { t } = useTranslation();
  return (
    <CommentListSyled>
      <div className="comment-title">{t('comment.comment')}</div>
      <UserProfileWithComment name={'권수연'} date={'24.01.05'} comment="얼마나 멋있나요?" />
      <UserProfileWithComment name={'변성은'} date={'24.01.05'} comment="본인이 찍었나요?" />
      <UserProfileWithComment
        name={'호빵맨에게 물린 호빵'}
        date={'24.01.05'}
        comment="가족들과 가보려고 합니다. 가족들과 가기에도 괜찮나요"
      />
    </CommentListSyled>
  );
};

const CommentListSyled = styled.div`
  .comment-title {
    padding-top: 16px;
    padding-bottom: 8px;
    ${({ theme }) => theme.font.body2}
  }
`;

export default CommenList;
