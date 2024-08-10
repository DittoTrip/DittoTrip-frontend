import { styled } from 'styled-components';
import Tap from '../components/common/Tab';
import { useState } from 'react';
import { TapItem } from './TapPage';
import Star from '../components/common/Star';
import AppBar from '../components/common/AppBar';
import LangSelectButton from '../components/LangSelectButton';
// import DropDown from '../components/common/DropDown';
import ReviewItem from '../components/review/ReviewItem';

const tapData: TapItem[] = [
  {
    id: 1,
    title: '전체',
    content: (
      <div>
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </div>
    ),
  },
  { id: 2, title: '댓글리뷰', content: <ReviewItem /> },
  { id: 3, title: '포토리뷰', content: <ReviewItem /> },
];
const Review = () => {
  const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);

  return (
    <ReviewStyle>
      <div className="app-bar">
        <AppBar
          leading={true}
          title={
            <div className="title">
              리뷰<div className="count"> (102)</div>
            </div>
          }
          action={<LangSelectButton />}
        />
      </div>
      <div className="rating">
        <Star rating={4.5} showRatingValue={true} color={'keyColor'} gap={8} size={24} />
      </div>

      <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
      <div className="content">
        {/* <DropDown setValue={() => alert('클릭')} /> */}
        {tapData.find(item => item.id === selectedId)?.content}
      </div>
    </ReviewStyle>
  );
};

const ReviewStyle = styled.div`
  .app-bar .title {
    display: flex;
    justify-content: center;
    ${({ theme }) => theme.font.subTitle};

    .count {
      color: ${({ theme }) => theme.color.gray60};
    }
  }

  .content {
    margin: 0 28px;
  }
`;

export default Review;
