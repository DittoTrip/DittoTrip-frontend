import { useEffect, useState } from 'react';

import { getSpotApplyList } from '../../api/spotApply';
import { SpotApplyMiniData } from '../../models/spotapply/spotApplyModel';

const useSpotApplyList = () => {
  const [spotApplyList, setSpotApplyList] = useState<SpotApplyMiniData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSpotApplyList = async () => {
    try {
      const response = await getSpotApplyList();

      setSpotApplyList(response.spotApplyMiniDataList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpotApplyList();
  }, []);

  return { spotApplyList, loading };
};

export default useSpotApplyList;
