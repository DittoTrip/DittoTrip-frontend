import { DittoCommentRequest } from '../models/dittocomment/dittoCommentModel';
import { api } from './https';

//디토 댓글 수정
export const modifyDittoComment = async (dittoId: string, commentId: string, data: DittoCommentRequest) => {
  const response = await api.put(`/ditto/${dittoId}/comment/${commentId}`, { data });
  return response.status;
};

//디토 댓글 삭제
export const deleteDittoComment = async (dittoId: string, commentId: string) => {
  const response = await api.delete(`/ditto/${dittoId}/comment/${commentId}`);
  return response.status;
};

//리뷰 댓글 등록
export const addDittoComment = async (dittoId: string, data: DittoCommentRequest, parentCommentId?: string) => {
  const response = await api.post(`/ditto/${dittoId}/comment`, { ...data }, { params: { parentCommentId } });
  return response.status;
};
