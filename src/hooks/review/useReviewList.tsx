import { useEffect, useState } from 'react';

import { getReviewList } from '../../api/review';
import { ReviewData } from '../../models/reveiw/reviewModel';

const useReviewList = (spotId: string, sort: string, page: number, size: number) => {
  const [reviewList, setReviewList] = useState<ReviewData[]>([]);
  const [rating, setRating] = useState<number>();
  const [reviewsCount, setReviewCount] = useState<number>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchSpotList = async () => {
    const req = { page, size, sort };
    try {
      const response = await getReviewList(spotId, req);
      if (response.reviewDataList.length < size) {
        setHasMore(false);
      }

      setReviewList(prev => [...prev, ...response.reviewDataList]);
      setRating(response.rating);
      setReviewCount(response.reviewsCount);
    } catch (err) {
      setError('리뷰리스트 불러오기 실패...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page == 0) {
      setReviewList([]);
      setHasMore(true);
    }
    fetchSpotList();
  }, [spotId, page, sort]);

  return { reviewList, rating, reviewsCount, loading, error, hasMore };
};

export default useReviewList;
