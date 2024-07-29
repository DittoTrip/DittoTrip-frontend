import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../store/authStore';

const BASE_URL = '';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const token = getToken();

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
    },
    // withCredentials: true,
    ...config,
  });
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();
