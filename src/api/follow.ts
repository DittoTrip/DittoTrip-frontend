import{
    FollowListResponse
}from '../models/follow/followModel'
import { api } from './https';

//팔로우 등록
export const addFollow = async(userId : string) => {
    const response = await api.post(`/follow/${userId}`);
    return response.status;
}

//팔로잉 리스트
export const FindFollowingList = async(userId : string) => {
    const response = await api.get<FollowListResponse>(`/following-list/${userId}`);
    return response.data;
}

//팔로워 리스트
export const FindFollowedList = async(userId : string) => {
    const response = await api.get<FollowListResponse>(`/followed-list/${userId}`);
    return response.data;
}

//팔로우 삭제
export const deleteFollow = async(followId : string) => {
    const response = await api.delete(`/follow/${followId}`);
    return response.status;
}