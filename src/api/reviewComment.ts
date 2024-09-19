import { ReviewCommentRequest } from '../models/reviewcomment/reviewCommentModel';
import { api } from './https';

//리뷰 댓글 수정
export const modifyReviewComment = async (reviewId: string, commentId: string, data: ReviewCommentRequest) => {
  const response = await api.put(`/review/${reviewId}/comment/${commentId}`, { data });
  return response.status;
};

//리뷰 댓글 삭제
export const deleteReviewComment = async (reviewId: string, commentId: string) => {
  const response = await api.delete(`/review/${reviewId}/comment/${commentId}`);
  return response.status;
};

//리뷰 댓글 등록
export const addReviewComment = async (reviewId: string, data: ReviewCommentRequest, parentCommentId?: string) => {
  const response = await api.post(`/review/${reviewId}/comment`, { ...data }, { params: { parentCommentId } });
  return response.status;
};
