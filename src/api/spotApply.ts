import { SpotApplyDetailResponse, SpotApplyMiniDataResponse } from '../models/spotapply/spotApplyModel';
import { api, apiMultipart } from './https';

//스팟 신청 등록
export const addSpotApply = async (data: FormData) => {
  const response = await apiMultipart.post('/spot/apply', data);
  return response.data;
};

//스팟 신청 삭제
export const deleteSpotApply = async (spotApplyId: string) => {
  const response = await api.delete(`/spot/apply/spot/apply/${spotApplyId}`);
  return response.status;
};

// 내 스팟신청리스트 조회
export const getSpotApplyList = async () => {
  const response = await api.get<SpotApplyMiniDataResponse>('/spot/apply/list/my');
  return response.data;
};
//스팟 신청 상세조회
export const getSpotApplyDetail = async (spotApplyId: string) => {
  const response = await api.get<SpotApplyDetailResponse>(`/spot/apply/${spotApplyId}`);
  return response.data;
};
