import { defaultPageOptions } from '../constants/constant';
import { SpotDetailResponse, SpotListResponse, spotMapListReq } from '../models/Spot/spotModel';
import { api } from './https';

// 스팟 북마크 추가
export const addSpotBookmark = async (id: string) => {
  const response = await api.post(`spot/${id}/bookmark`);
  return response.status;
};
// 스팟 북마크 삭제
export const removeSpotBookmark = async (spotId: string, bookmarkId: number) => {
  const response = await api.delete(`spot/${spotId}/bookmark/${bookmarkId}`);
  return response.status;
};
// 스팟 상세
export const spotDetail = async (spotId: string) => {
  const response = await api.get<SpotDetailResponse>(`spot/${spotId}`);
  return response.data;
};
// 카테고리 -> 전체 스팟 리스트
export const spotList = async (categoryId: string, page: number, sort: string) => {
  const response = await api.get<SpotListResponse>(`category/${categoryId}/spot/list`, {
    params: { page, defaultPageOptions, sort },
  });
  return response.data;
};
// 카테고리 -> map 스팟 리스트
export const spotMapList = async (categoryId: string, data: spotMapListReq) => {
  const response = await api.get<SpotListResponse>(`category/${categoryId}/spot/list`, {
    params: { data },
  });
  return response.data;
};
