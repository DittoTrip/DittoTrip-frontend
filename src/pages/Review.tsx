import { styled } from 'styled-components';
import Tap from '../components/common/Tab';
import { useState } from 'react';
import { TapItem } from './TapPage';
import Star from '../components/common/Star';

const tapData: TapItem[] = [
  { id: 1, title: '전체', content: <div>전체 리뷰</div> },
  { id: 2, title: '댓글리뷰', content: <div>댓글 리뷰</div> },
  { id: 3, title: '포토리뷰', content: <div>포토리뷰</div> },
];
const Review = () => {
  const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);

  return (
    <ReviewStyle>
      <Star rating={4.5} />
      <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
      <div className="content">{tapData.find(item => item.id === selectedId)?.content}</div>
    </ReviewStyle>
  );
};

const ReviewStyle = styled.div``;

export default Review;
