import { SearchUserRequset, SearchUserResponse, UserProfileRequset } from '../models/user/userModel';
import { api } from './https';

// 내 프로필 수정하기
export const modifyUserProfile = async (data: UserProfileRequset) => {
  const response = await api.put('/profile', { data });
  return response.status;
};

// 유저 검색하기
export const searchUser = async (data: SearchUserRequset) => {
  const response = await api.get<SearchUserResponse>('/user/list', {
    params: { ...data },
  });
  return response.data;
};
