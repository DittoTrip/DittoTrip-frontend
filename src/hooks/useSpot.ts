import { useState, useEffect } from 'react';
import { spotDetail } from '../api/spot';
import { SpotDetailResponse } from '../models/Spot/spotModel';

const useSpotDetail = (spotId: string) => {
  const [spotDetailData, setSpotDetailData] = useState<SpotDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSpotDetail = async () => {
      setLoading(true);
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
  }, [spotId]);

  return { spotDetailData, error, loading };
};

export default useSpotDetail;
