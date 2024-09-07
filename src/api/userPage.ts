import{
    UserPageResponse
}from '../models/userpage/userPageModel'
import { api } from './https';

//유저 페이지 조회
export const getUserPage = async(userId : string) => {
    const response = await api.get<UserPageResponse>(`user/${userId}/user-page`);
    return response.status;
}