import { useParams } from 'react-router-dom';
import useReviewDetail from '../hooks/review/useReviewDetail';
import { styled } from 'styled-components';

import AppBar from '../components/common/AppBar';
import LangSelectButton from '../components/LangSelectButton';
import ReviewItem from '../components/review/ReviewItem';
import CommentList from '../components/comment/CommentList';
import CommentInput from '../components/comment/CommentInput';
import ErrorPage from './Error';

const ReviewDetail = () => {
  const { id } = useParams();
  const { reviewDetailData, spotData, commentData, error, loading } = useReviewDetail(id!);
  console.log(reviewDetailData, commentData);

  if (loading) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  } else if (error) {
    return <ErrorPage message={'spot id를 확인해주세요'} type="error" />;
  }

  return (
    <ReviewDetailStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{spotData}</div>} action={<LangSelectButton />} />
      </div>
      <div className="content">
        <ReviewItem setIsExpandedOption={() => {}} review={reviewDetailData!} />
      </div>
      <div className="comment-list">
        <CommentList comments={commentData} />
      </div>
      <CommentInput />
    </ReviewDetailStyle>
  );
};

const ReviewDetailStyle = styled.div`
  padding-bottom: 160px;

  .app-bar .title {
    display: flex;
    justify-content: start;
    ${({ theme }) => theme.font.subTitle};
  }
  .content {
    padding: 0 28px;
  }
  .comment-list {
    padding: 0 28px;
  }
`;

export default ReviewDetail;
