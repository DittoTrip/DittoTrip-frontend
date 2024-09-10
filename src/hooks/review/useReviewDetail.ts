import { useState, useEffect } from 'react';
import { ReviewCommentData, ReviewData } from '../../models/reveiw/reviewModel';
import { getReview } from '../../api/review';

const useReviewDetail = (reviewId: string) => {
  const [reviewDetailData, setReviewDetailData] = useState<ReviewData | null>(null);
  const [spotData, setSpotData] = useState<string>('');
  const [commentData, setCommentData] = useState<ReviewCommentData[]>([]);

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviewDetail = async () => {
      setLoading(true);
      try {
        const response = await getReview(reviewId);
        console.log('response: ' + JSON.stringify(response));
        if (response) {
          setReviewDetailData(response.reviewData);
          setSpotData(response.spotName);
          setCommentData(response.reviewCommentDataList);
        }
      } catch (err) {
        setError('스팟 상세정보 불러오기 실패');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetail();
  }, [reviewId]);

  return { reviewDetailData, spotData, commentData, error, loading };
};

export default useReviewDetail;
