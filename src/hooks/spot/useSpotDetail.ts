import { useState, useEffect } from 'react';
import { spotDetail } from '../../api/spot';
import { SpotDetailResponse } from '../../models/spot/spotModel';

const useSpotDetail = (spotId: string, isBookmarked: boolean) => {
  const [spotDetailData, setSpotDetailData] = useState<SpotDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSpotDetail = async () => {
      try {
        const response = await spotDetail(spotId);
        if (response) {
          setSpotDetailData(response);
        }
      } catch (err) {
        setError('스팟 상세정보 불러오기 실패');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotDetail();
  }, [spotId, isBookmarked]);

  return { spotDetailData, error, loading };
};

export default useSpotDetail;
