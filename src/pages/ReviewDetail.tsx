import { styled } from 'styled-components';
import AppBar from '../components/common/AppBar';

const ReviewDetail = () => {
  return (
    <ReviewDetailStyle>
      <AppBar leading={true} title={<div className="title">촬영지 이름</div>} />
    </ReviewDetailStyle>
  );
};

const ReviewDetailStyle = styled.div`
  .app-bar .title {
    display: flex;
    justify-content: start;
    ${({ theme }) => theme.font.subTitle};
  }
`;

export default ReviewDetail;
