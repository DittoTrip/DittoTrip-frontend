import { useEffect, useState } from 'react';

import { getUserDittoList } from '../../api/ditto';
import { DittoMiniData } from '../../models/ditto/dittoModel';

const useUserDittoList = (userId: string, page: number, size: number) => {
  const [dittoList, setDittoList] = useState<DittoMiniData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchDittioList = async () => {
    const req = { page, size };
    try {
      const response = await getUserDittoList(userId, req);
      if (page + 1 == response.totalPage) {
        setHasMore(false);
      }

      setDittoList(prev => [...prev, ...response.dittoMiniDataList]);
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page == 0) {
      setDittoList([]);
      setHasMore(true);
    }
    fetchDittioList();
  }, [userId, page]);

  return { dittoList, loading, error, hasMore };
};

export default useUserDittoList;
