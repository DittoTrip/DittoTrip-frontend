import { useEffect, useState } from 'react';
import { SpotData } from '../../models/Spot/spotModel';
import { spotList } from '../../api/spot';
import { CategoryData } from '../../models/Category/categoryModel';

const useSpotList = (categoryId: string, sort: string, page: number, size: number) => {
  const [spotData, setSpotData] = useState<SpotData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const [userX, setUserX] = useState<number | null>(null);
  const [userY, setUserY] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setUserX(position.coords.latitude);
      setUserY(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    const fetchSpotList = async () => {
      const req = { page, size, sort, userX, userY };
      // const req = { page, size, userX, userY };
      try {
        const response = await spotList(categoryId, req);
        if (response.spotDataList.length < size) {
          setHasMore(false);
        }

        setSpotData(prev => [...prev, ...response.spotDataList]);
        setCategoryData(response.categoryData);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (userX && userY) fetchSpotList();
  }, [categoryId, userX, userY, page, size, sort]);

  return { spotData, categoryData, loading, error, hasMore };
};

export default useSpotList;
