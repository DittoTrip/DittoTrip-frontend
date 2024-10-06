import { useEffect, useState } from 'react';

import { spotList } from '../../api/spot';

import { CategoryData } from '../../models/category/categoryModel';
import { SpotData } from '../../models/spot/spotModel';
import { useTranslation } from 'react-i18next';

const useSpotList = (
  categoryId: string,
  sort: string,
  page: number,
  size: number,
  userX: number | null,
  userY: number | null
) => {
  const [spotData, setSpotData] = useState<SpotData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { t } = useTranslation();

  const fetchSpotList = async (prev: SpotData[]) => {
    const req = { page, sort, size, userX, userY };
    try {
      const response = await spotList(categoryId, req);

      if (page + 1 >= response.totalPages) {
        setHasMore(false);
      }

      setSpotData([...prev, ...response.spotDataList]);
      setCategoryData(response.categoryData);
    } catch (err) {
      setError(t('guide.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 유저 위치를 처음 불러온 경우
    if (page == 0 && userX !== null && userY !== null) {
      setHasMore(true);
      fetchSpotList([]);
      // 기본 데이터 로드
    } else if (page === 0) {
      setHasMore(true);
      fetchSpotList([]);
      // 페이지 이동
    } else {
      fetchSpotList(spotData);
    }
  }, [page, categoryId, userX, userY, sort]);

  return { spotData, categoryData, loading, error, hasMore };
};

export default useSpotList;
