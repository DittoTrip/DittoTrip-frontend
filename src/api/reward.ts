import{
    UserBadgeResponse,
    UserItemListResponse
}from '../models/reward/rewardModel'
import { api } from './https';


//유저의 뱃지리스트 조회
export const findBadgeList = async(userId : string) => {
    const response = await api.get<UserBadgeResponse>(`/user/${userId}/badge/list`);
    return response.data;
}


//내 아이템 리스트 조회(프로필아이템)
export const findItemList = async() => {
    const response = await api.get<UserItemListResponse>('/item/list');
    return response.data;
}