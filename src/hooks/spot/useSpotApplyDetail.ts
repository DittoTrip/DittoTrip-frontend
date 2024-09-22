import { useState, useEffect } from 'react';
import { getSpotApplyDetail } from '../../api/spotApply';
import { SpotApplyData } from '../../models/spotapply/spotApplyModel';

const useSpotApplyDetail = (spotId: string) => {
  const [spotApplyDetailData, setSpotApplyDetailData] = useState<SpotApplyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSpotApplyDetail = async () => {
      setLoading(true);
      try {
        const response = await getSpotApplyDetail(spotId);
        if (response) {
          setSpotApplyDetailData(response.spotApplyData);
        }
      } catch (err) {
        setError('스팟 신청 상세정보 불러오기 실패');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotApplyDetail();
  }, [spotId]);

  return { spotApplyDetailData, error, loading };
};

export default useSpotApplyDetail;
