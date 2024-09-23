import { useEffect, useState } from 'react';

import { getVisitedSpotList } from '../../api/spot';

import { SpotVisit } from '../../models/spot/spotModel';

const useVisitedSpotList = (userId: string, page: number, size: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPage, setTotalPages] = useState(1);

  const [visitedList, setVisitedList] = useState<SpotVisit[]>([]);

  const fetchVistiedList = async () => {
    setLoading(true);

    const req = {
      page: page,
      size: size,
    };

    try {
      const res = await getVisitedSpotList(userId!, req);

      if (res.spotVisitDataList) {
        setVisitedList(prev => [...prev, ...res.spotVisitDataList]);
      }

      setTotalPages(res.totalPages);
    } catch (error) {
      console.log('방문 스팟 조회 error 발생', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page == 0) {
      setVisitedList([]);
    }
    fetchVistiedList();
  }, [userId, page]);

  return { visitedList, loading, totalPage };
};

export default useVisitedSpotList;
