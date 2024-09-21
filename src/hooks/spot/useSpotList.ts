import { useEffect, useState } from 'react';

import { spotList } from '../../api/spot';

import { CategoryData } from '../../models/category/categoryModel';
import { SpotData } from '../../models/Spot/spotModel';

const useSpotList = (categoryId: string, sort: string, page: number, size: number) => {
  const [spotData, setSpotData] = useState<SpotData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const [userX, setUserX] = useState<number | null>(null);
  const [userY, setUserY] = useState<number | null>(null);

  const fetchSpotList = async () => {
    const req = { page, size, sort, userX, userY };
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setUserX(position.coords.latitude);
      setUserY(position.coords.longitude);
    });
  }, []);

  // 나머지가 바뀌면 + fetchSpotList
  useEffect(() => {
    if (page == 0) {
      setSpotData([]);
      setHasMore(true);
    }
    if (userX && userY) fetchSpotList();
  }, [categoryId, userX, userY, page, sort]);

  // sort가 바뀌면 모두 비우고 fetchSpotList

  return { spotData, categoryData, loading, error, hasMore };
};

export default useSpotList;
