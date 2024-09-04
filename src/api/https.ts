import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://dittotrip.site',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use(
  config => {
    // console.log("🔮 [Req config]", config, "\n");
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
  error => {
    // console.log("🧨 [Res ERROR]", error, "\n");
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
