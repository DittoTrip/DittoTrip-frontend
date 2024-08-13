import { styled } from 'styled-components';

import LangSelectButton from '../components/LangSelectButton';
import AppBar from '../components/common/AppBar';

const NewReview = () => {
  return (
    <NewReviewStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">리뷰 쓰기</div>} action={<LangSelectButton />} />
      </div>
      <div>리뷰</div>
      <div>
        <input type="text" className="review-text" placeholder="1000자까지 작성가능합니다." />
      </div>
    </NewReviewStyle>
  );
};

const NewReviewStyle = styled.div`
  .app-bar .title {
    display: flex;
    justify-content: start;
    ${({ theme }) => theme.font.subTitle};
  }
  .review-text {
    height: 200px;
    width: 100%;

    border-radius: 12px;
    border: none;
    outline: none;

    background-color: ${({ theme }) => theme.color.gray20};
  }
`;

export default NewReview;
