import { HomeData } from '../models/mainpage/mainpage';
import { api } from './https';

export const getHomeData = async () => {
  const response = await api.get<HomeData>('/main-page');
  return response.data;
};
