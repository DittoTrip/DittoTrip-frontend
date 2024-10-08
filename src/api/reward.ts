import { UserQuestDataListResponse } from '../models/quest/questModel';
import { UserBadgeResponse, UserItemListResponse } from '../models/reward/rewardModel';
import { UserProfileItem } from '../models/user/userModel';
import { api } from './https';

//유저의 뱃지리스트 조회
export const getBadgeList = async (userId: string) => {
  const response = await api.get<UserBadgeResponse>(`/user/${userId}/badge/list`);
  return response.data;
};

//내 아이템 리스트 조회(프로필아이템)
export const getItemList = async () => {
  const response = await api.get<UserItemListResponse>('/item/list');
  return response.data;
};

// 뱃지 수정
export const modyfyBadge = async (userBadgeId: number) => {
  const response = await api.put('/profile/badge', { userBadgeId });
  return response.status;
};
// 캐릭터 수정
export const modyfyItem = async (item: UserProfileItem[]) => {
  const response = await api.put('/profile/items', {
    userItemSkinId: item[0].userRewardId,
    userItemHairId: item[1].userRewardId,
    userItemEyesId: item[2].userRewardId,
    userItemMouthId: item[3].userRewardId,
    userItemAccessoryId: item[4].userRewardId,
  });
  return response.status;
};
//유저의 퀘스트리스트 조회
export const getQuestList = async (UserQuestStatus: string) => {
  const response = await api.get<UserQuestDataListResponse>(`/quest/list`, { params: { UserQuestStatus } });
  return response.data;
};
//유저의 퀘스트 보상 수령
export const getQuestItem = async (userQuestId: number) => {
  const response = await api.post(`/quest/${userQuestId}/achieve`);
  return response;
};
