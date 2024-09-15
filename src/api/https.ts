import axios from 'axios';
import { logout, refreshToken } from './auth';
import { getAccessToken, useAuthStore } from '../store/authStore';

export const api = axios.create({
  baseURL: 'http://dittotrip.site',
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
    // 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use(
  config => {
    const token = getAccessToken();
    HeaderToken.set(token);
    return config;
  },
  error => {
    // console.log("🧨 [Req ERROR]", error, "\n");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    // console.log("🔮 [Res]", response, "\n");
    return response;
  },
  async error => {
    const originalConfig = error.config; // 기존에 수행하려고 했던 작업
    const status = error.response.status; // 현재 발생한 에러 코드

    const { storeLogin, storeLogout } = useAuthStore();
    if (status === 401) {
      console.log('토큰 재발급 요청');
      alert('토큰 재발급');
      refreshToken()
        .then(res => {
          console.log('토큰 재발급 성공res : ', res);
          // 새 토큰 저장

          storeLogin(res.accessToken, res.refreshToken);

          // 새로 응답받은 데이터로 토큰 만료로 실패한 요청에 대한 인증 시도 (header에 토큰 담아 보낼 때 사용)
          originalConfig.headers['authorization'] = res.accessToken;
          originalConfig.headers['refresh'] = res.refreshToken;

          // console.log("New access token obtained.");
          // 새로운 토큰으로 재요청
          return api(originalConfig);
        })
        .catch(() => {
          console.error('토큰 재발급 실패', error);
          logout().then(() => {
            console.log('로그아웃');
            storeLogout();
          });
        });
    }

    return Promise.reject(error);
  }
);

export default class HeaderToken {
  public static set = (token: string | null): void => {
    if (token) {
      api.defaults.headers.common.Authorization = `${token}`;
      console.log('headertoken', token);
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  };
}
