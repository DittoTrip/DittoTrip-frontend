import { CategorySearchResponse } from '../models/category/categoryModel';
import { api } from './https';

// 인기 검색어
export const getSearchRank = async () => {
  const response = await api.get(`/search-page/ranking/words`);
  return response.data;
};

// 인기 검색어
export const getCategoryRank = async (majorType: string) => {
  const response = await api.get<CategorySearchResponse>(`/search-page/ranking/category`, { params: { majorType } });
  return response.data;
};
