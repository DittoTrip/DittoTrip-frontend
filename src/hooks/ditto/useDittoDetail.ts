import { useState, useEffect } from 'react';
import { getDitto } from '../../api/ditto';
import { CommentData, DittoData } from '../../models/ditto/dittoModel';

const useDittoDetail = (dittoId: string) => {
  const [dittoData, setDittoData] = useState<DittoData | null>(null);
  const [commentData, setCommentData] = useState<CommentData[] | null>(null);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [initialBookmarkCount, setInitialBookmarkCount] = useState<number | null>(null);
  const [isMyFollowing, setIsMyFollowing] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSpotDetail = async () => {
      setLoading(true);
      try {
        const response = await getDitto(dittoId);
        if (response) {
          setDittoData(response.dittoData);
          setCommentData(response.commentDataList);
          setCommentCount(response.commentCount);
          setInitialBookmarkCount(response.bookmarkCount);
          setIsMyFollowing(response.isMyFollowing);
        }
      } catch (err) {
        setError('스팟 상세정보 불러오기 실패');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotDetail();
  }, [dittoId]);

  return { dittoData, commentData, commentCount, initialBookmarkCount, isMyFollowing, error, loading };
};

export default useDittoDetail;
