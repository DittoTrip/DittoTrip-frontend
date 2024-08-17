import { styled } from 'styled-components';
import AppBar from '../components/common/AppBar';
import LangSelectButton from '../components/LangSelectButton';
import ReviewItem from '../components/review/ReviewItem';

const ReviewDetail = () => {
  return (
    <ReviewDetailStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">촬영지 이름</div>} action={<LangSelectButton />} />
      </div>
      <div className="content">
        <ReviewItem />
      </div>
    </ReviewDetailStyle>
  );
};

const ReviewDetailStyle = styled.div`
  .app-bar .title {
    display: flex;
    justify-content: start;
    ${({ theme }) => theme.font.subTitle};
  }
  .content {
    padding: 0 28px;
  }
`;

export default ReviewDetail;
