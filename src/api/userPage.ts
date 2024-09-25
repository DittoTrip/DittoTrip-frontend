import { UserPageResponse } from '../models/userpage/userPageModel';
import { api } from './https';

//유저 페이지 조회
export const getUserPage = async (userId: string) => {
  const response = await api.get<UserPageResponse>(`/user-page/${userId}`);
  return response.data;
};
//마이 페이지 조회
export const getMyPage = async () => {
  const response = await api.get<UserPageResponse>(`/user-page/my`);
  return response.data;
};
