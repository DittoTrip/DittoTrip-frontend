import { useState, useEffect } from 'react';
import { getDitto } from '../../api/ditto';
import { DittoData, DittoCommentData } from '../../models/ditto/dittoModel';

const useDittoDetail = (dittoId: string) => {
  const [dittoData, setDittoData] = useState<DittoData | null>(null);
  const [dittoComment, setdittoComment] = useState<DittoCommentData[] | null>(null);
  const [commentCount, setCommentCount] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSpotDetail = async () => {
      setLoading(true);
      try {
        const response = await getDitto(dittoId);
        if (response) {
          setDittoData(response.dittoData);
          setdittoComment(response.parentDittoCommentDataList);
          setCommentCount(response.commentCount);
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

  return { dittoData, dittoComment, commentCount, error, loading };
};

export default useDittoDetail;
