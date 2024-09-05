import { useEffect, useState } from 'react';
import { SpotListResponse } from '../../models/Spot/spotModel';
import { spotList } from '../../api/spot';

const useSpotList = (categoryId: string, sort: string) => {
  const [data, setData] = useState<SpotListResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  navigator.geolocation.getCurrentPosition(position => {
    position.coords.latitude, position.coords.longitude;
  });

  useEffect(() => {
    const fetchSpotList = async () => {
      try {
        const response = await spotList(categoryId, 0, sort);
        setData(response);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpotList();
  }, [categoryId]);

  return { data, loading, error };
};

export default useSpotList;
