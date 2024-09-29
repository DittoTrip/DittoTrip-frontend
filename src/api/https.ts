import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getNewRereshToken } from './auth';
import { getAccessToken, getRefreshToken, useAuthStore } from '../store/authStore';
import i18n from '../lang/i18n';

let isRefreshing = false; // 재발급이 진행 중인지 여부
let refreshSubscribers: ((token: string) => void)[] = []; // 대기 중인 요청들

// 새로운 토큰이 발급되면 대기 중이던 요청들에게 토큰을 전달
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = []; // 대기 중이던 요청들 처리 후 초기화
};

// 재발급이 완료되기 전까지 대기
const addSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// application/json용
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// 리프레시 api용
export const refreshApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// multipart/form-data용
export const apiMultipart = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addRequestInterceptor = (instance: any) => {
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getAccessToken();
      HeaderToken.set(token, getRefreshToken());

      // headers가 undefined일 경우 빈 객체로 초기화
      if (!config.headers) {
        config.headers = {};
      }

      const language = i18n.language; // 현재 언어 가져오기
      config.headers['Accept-Language'] = language; // Accept-Language 헤더 설정
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addResponseInterceptor = (instance: any) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalConfig = error.config;
      const status = error.response?.status;
      const message = error.response?.data;

      // 리프레시 토큰 만료시 알림 + 로그인으로 이동
      if (status === 401 && message === '만료된 리프레시 토큰') {
        alert('리프레시 토큰 만료. 다시 로그인하세요.');

        useAuthStore.getState().storeLogout();
        window.location.replace('/login');
      }

      // 엑세스 토큰 만료
      if (status === 401 && message === '만료된 엑세스 토큰') {
        console.log('만료된 요청');
        if (!isRefreshing) {
          isRefreshing = true; // 토큰 재발급
          console.log('재발급');
          try {
            const res = await getNewRereshToken(); // 토큰 재발급 요청
            const { accessToken, refreshToken } = res;

            // 새로운 토큰 저장
            useAuthStore.getState().storeLogin(accessToken, refreshToken);
            HeaderToken.set(accessToken, refreshToken);

            // 대기 중인 요청들에게 새로운 토큰 전달
            onRefreshed(accessToken);
            isRefreshing = false; // 재발급 완료

            // 새로운 토큰으로 재요청
            originalConfig!.headers['Authorization'] = `${accessToken}`;
            return await api(originalConfig!);
          } catch (refreshError) {
            useAuthStore.getState().storeLogout();
            window.location.replace('/login');
          }
        }

        // 재발급이 진행 중이라면 대기열에
        return new Promise(resolve => {
          addSubscriber((token: string) => {
            originalConfig!.headers['Authorization'] = `${token}`;
            resolve(api(originalConfig!)); // 재요청
          });
        });
      }

      return Promise.reject(error);
    }
  );
};

addRequestInterceptor(api);
addRequestInterceptor(apiMultipart);
addRequestInterceptor(refreshApi);

addResponseInterceptor(api);
addResponseInterceptor(apiMultipart);
addResponseInterceptor(refreshApi);

export default class HeaderToken {
  public static set = (accessToken: string | null, refreshToken: string | null): void => {
    if (accessToken) {
      api.defaults.headers.common.Authorization = `${accessToken}`;
      apiMultipart.defaults.headers.common.Authorization = `${accessToken}`;
      refreshApi.defaults.headers.common.Authorization = `${refreshToken}`;
    } else {
      delete api.defaults.headers.common.Authorization;
      delete apiMultipart.defaults.headers.common.Authorization;
      delete refreshApi.defaults.headers.common.Authorization;
    }
  };
}
