import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

const KakaoLoginRedirect = () => {
  const { storeLogin } = useAuthStore();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get('accessToken');
    const refreshToken = queryParams.get('refreshToken');

    if (accessToken && refreshToken) {
      console.log('갱신', accessToken, refreshToken);
      storeLogin(accessToken, refreshToken);
    }
  }, []);

  return null;
};

export default KakaoLoginRedirect;
