import { useState, useEffect } from 'react';
import { getMyPage, getUserPage } from '../../api/userPage';
import { UserPageResponse } from '../../models/userpage/userPageModel';

const useUserData = (userId: string) => {
  const [userData, setUserData] = useState<UserPageResponse>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (userId) {
          const response = await getUserPage(userId);
          if (response) {
            setUserData(response);
          }
        } else {
          const response = await getMyPage();
          if (response) {
            setUserData(response);
          }
        }
      } catch (err) {
        setError('마이 페이지 정보 불러올 수 없습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, error, loading };
};

export default useUserData;
