import { useEffect, useState } from 'react';

import { getDittoBookmarkList } from '../../api/ditto';
import { DittoMiniData } from '../../models/ditto/dittoModel';

const useUserFavoriteDittoList = () => {
  const [bookmarkedDittoList, setbookmarkedDittoList] = useState<DittoMiniData[]>([]);

  const [floading, setLoading] = useState(true);

  const fetchDittioList = async () => {
    try {
      const response = await getDittoBookmarkList();

      setbookmarkedDittoList(response.dittoMiniDataList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDittioList();
  }, []);

  return { bookmarkedDittoList, floading };
};

export default useUserFavoriteDittoList;
