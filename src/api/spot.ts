import axios from 'axios';
import {
  SpotDetailResponse,
  SpotListRequest,
  SpotListResponse,
  spotMapListRequest,
  SpotSearchListResponse,
  SpotVisitResponse,
} from '../models/spot/spotModel';
import { api } from './https';
import { AroundSpotProps, LocationBasedListResponse } from '../models/spot/publicSpotModel';
import i18n from '../lang/i18n';

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

// 북마크 여부 확인
export const bookmarkedSpot = async (id: string) => {
  const response = await api.get<boolean>(`spot/${id}/bookmark`);
  return response.data;
};
// 스팟 상세
export const spotDetail = async (spotId: string) => {
  const response = await api.get<SpotDetailResponse>(`spot/${spotId}`);
  return response.data;
};

// 카테고리 -> 전체 스팟 리스트
export const spotList = async (categoryId: string, params: SpotListRequest) => {
  const response = await api.get<SpotListResponse>(`category/${categoryId}/spot/list`, {
    params: { ...params },
  });
  return response.data;
};
// 카테고리 -> map 스팟 리스트
export const spotMapList = async (categoryId: string, params: spotMapListRequest) => {
  const response = await api.get<SpotListResponse>(`category/${categoryId}/spot/list/map`, {
    params: params,
  });
  return response.data;
};
// 방문 처리
export const postVisitedSpot = async (spotId: string, userX?: number, userY?: number) => {
  console.log(userX, userY);
  const response = await api.post<number>(
    `spot/${spotId}`,
    {},
    {
      params: { userX, userY },
    }
  );
  return response;
};

// 방문 스팟 리스트
export const getVisitedSpotList = async (userId: string, params: SpotListRequest) => {
  const response = await api.get<SpotVisitResponse>(`/user/${userId}/visited`, {
    params: { ...params },
  });
  console.log(response.data);
  return response.data;
};

// 스팟 검색 (검색페이지)
export const searchSpot = async (params: SpotListRequest) => {
  const response = await api.get<SpotSearchListResponse>(`spot/list/search`, {
    params: { ...params },
  });
  console.log(response.data);
  return response.data;
};

// 북마크한 스팟 리스트
export const favoriteSpotList = async (userX?: number, userY?: number) => {
  console.log('위치', userX, userY);
  const response = await api.get<SpotListResponse>(`/spot/list/bookmark`, {
    params: { userX, userY },
  });
  return response.data;
};
// 공공데이터 주변 스팟 리스트
export const aroundSpotList = async (params: AroundSpotProps) => {
  const response = axios.get<LocationBasedListResponse>(
    i18n.language == 'ko'
      ? 'https://apis.data.go.kr/B551011/KorService1/locationBasedList1'
      : 'https://apis.data.go.kr/B551011/EngService1/locationBasedList1',
    { params: { ...params } }
  );
  return response;
};
