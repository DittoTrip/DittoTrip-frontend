import { useState, useEffect } from 'react';
import { ReviewData } from '../../models/reveiw/reviewModel';
import { getReview } from '../../api/review';
import { CommentData } from '../../models/ditto/dittoModel';

const useReviewDetail = (reviewId: string) => {
  const [reviewDetailData, setReviewDetailData] = useState<ReviewData | null>(null);
  const [spotData, setSpotData] = useState<string>('');
  const [commentData, setCommentData] = useState<CommentData[]>([]);

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviewDetail = async () => {
      setLoading(true);
      try {
        const response = await getReview(reviewId);
        if (response) {
          setReviewDetailData(response.reviewData);
          setSpotData(response.spotName);
          setCommentData(response.commentDataList);
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
