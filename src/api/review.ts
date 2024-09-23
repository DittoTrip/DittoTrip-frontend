import {
  SpotReviewResponse,
  ReviewModifyRequset,
  ReviewPageRequest,
  ReviewListResponse,
} from '../models/reveiw/reviewModel';
import { api, apiMultipart } from './https';

// 리뷰 조회
export const getReview = async (reviewId: string) => {
  const response = await api.get<SpotReviewResponse>(`/review/${reviewId}`);
  return response.data;
};

// 리뷰 수정
export const modifyReview = async (reviewId: string, data: ReviewModifyRequset) => {
  const response = await api.put(`/review/${reviewId}`, { data });
  return response.status;
};

// 리뷰 삭제
export const deleteReview = async (reviewId: string) => {
  const response = await api.delete(`/review/${reviewId}`);
  return response.status;
};

// 리뷰 등록
export const addReview = async (data: FormData) => {
  const response = await apiMultipart.post('/review', data);
  return response.status;
};

// 리뷰 좋아요 조회
export const getReviewLike = async (reviewId: string) => {
  const response = await api.get<boolean>(`/review/${reviewId}/like`);
  return response.data;
};

// 리뷰 좋아요 등록
export const addReviewLike = async (reviewId: string) => {
  const response = await api.post(`/review/${reviewId}/like`);
  return response.status;
};

// 리뷰 좋아요 삭제
export const deleteReviewLike = async (reviewId: string) => {
  const response = await api.delete(`/review/${reviewId}/like`);
  return response.status;
};

// 스팟의 리뷰리스트 조회
export const getReviewList = async (spotId: string, params: ReviewPageRequest) => {
  const response = await api.get<ReviewListResponse>(`/spot/${spotId}/review/list`, { params: { ...params } });
  return response.data;
};
