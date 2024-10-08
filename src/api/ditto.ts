import { DittoDetailResponse, DittoPageRequest, DittoListResponse } from '../models/ditto/dittoModel';
import { api, apiMultipart } from './https';

//디토 상세조회
export const getDitto = async (dittoId: string) => {
  const response = await api.get<DittoDetailResponse>(`/ditto/${dittoId}`);
  return response.data;
};

//디토 수정
export const modifyDitto = async (dittoId: string, data: FormData) => {
  const response = await apiMultipart.put(`/ditto/${dittoId}`, data);
  return response.status;
};

//디토 삭제
export const deleteDitto = async (dittoId: string) => {
  const response = await api.delete(`/ditto/${dittoId}`);
  return response.status;
};

//디토 등록
export const addDitto = async (data: FormData) => {
  const response = await apiMultipart.post('/ditto', data);
  return response.status;
};

//디토 북마크 조회
export const getDittoBookmark = async (dittoId: string) => {
  const response = await api.get<boolean>(`/ditto/${dittoId}/bookmark`);
  return response.data;
};

//디토 북마크 추가
export const addDittoBookemark = async (dittoId: string) => {
  const response = await api.post(`/ditto/${dittoId}/bookmark`);
  return response.status;
};

//디토 북마크 삭제
export const deleteDittoBookmark = async (dittoId: string) => {
  const response = await api.delete(`/ditto/${dittoId}/bookmark`);
  return response.status;
};

//디토 리스트 조회 - 사용 x
export const getDittoList = async (data: DittoPageRequest) => {
  const response = await api.get<DittoListResponse>('/ditto/list', { data });
  return response.data;
};
//디토 리스트 조회 - 검색
export const searchDittoList = async (query: string, data: DittoPageRequest) => {
  const response = await api.get<DittoListResponse>('/ditto/list/search', {
    params: { query, ...data },
  });
  return response.data;
};

//내 북마크 디토리스트 조회
export const getDittoBookmarkList = async () => {
  const response = await api.get<DittoListResponse>('/ditto/list/bookmark');
  return response.data;
};
//유저의 디토리스트 조회
export const getUserDittoList = async (userId: string, data: DittoPageRequest) => {
  const response = await api.get<DittoListResponse>(`/ditto/list/user/${userId}`, { params: data });
  return response.data;
};
