import { useEffect, useState } from 'react';
import { getDittoList } from '../../api/ditto';
import { DittoMiniData } from '../../models/ditto/dittoModel';

const useDittoList = (page: number, size: number) => {
  const [dittoList, setdittoList] = useState<DittoMiniData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchSpotList = async () => {
    const req = { page, size };
    try {
      const response = await getDittoList(req);
      if (response.dittoMiniDataList.length < size) {
        setHasMore(false);
      }

      setdittoList(prev => [...prev, ...response.dittoMiniDataList]);
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page == 0) {
      setdittoList([]);
      setHasMore(true);
    }
    fetchSpotList();
  }, [page]);

  return { dittoList, loading, error, hasMore };
};

export default useDittoList;
