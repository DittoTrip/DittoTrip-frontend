import { useState, useEffect } from 'react';
import { postVisitedSpot } from '../../api/spot';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const useVisitedSpot = (spotId: string) => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const [isVisited, setIsVisited] = useState<boolean>(false);
  const [userX, setUserX] = useState<number | null>(null);
  const [userY, setUserY] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserX(position.coords.latitude);
        setUserY(position.coords.longitude);
      },
      error => {
        console.error('위치 정보를 가져오지 못했습니다.', error.message);
      }
    );
  }, []);

  const markSpotAsVisited = async () => {
    if (userX == null || userY == null) {
      return;
    }
    if (!isLoggedIn) {
      alert(t('guide.login'));
      navigate('/login');
      return;
    }

    try {
      await postVisitedSpot(spotId, userX!, userY!);
      setIsVisited(true);
      console.log('방문 성공');
    } catch (error) {
      console.error('방문 실패', error);
      alert('위치를 다시 확인하세요.');
    }
  };

  return { isVisited, markSpotAsVisited };
};

export default useVisitedSpot;
