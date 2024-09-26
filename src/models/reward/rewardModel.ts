import { UserProfileData } from '../user/userModel';

export type ItemType = 'SKIN' | 'EYES' | 'MOUTH' | 'HAIR' | 'ACCESSORY';

export interface BadgeData {
  rewardId: number;
  name: string;
  body: string;
  conditionBody: string;
  imagePath: string;
  createdDateTime: Date;
  userBadgeId: number;
}

export interface UserBadgeResponse {
  userProfileData: UserProfileData;
  badgeDataList: BadgeData[];
  isMine: boolean;
}

export interface Item {
  id: number;
  imagePath: string;
  createdDateTime: Date;
  itemType: ItemType;
}

export interface UserItemDataMap {
  SKIN: Item[];
  EYES: Item[];
  MOUTH: Item[];
  HAIR: Item[];
  ACCESSORY: Item[];
}

export interface UserItemListResponse {
  userProfileData: UserProfileData;
  userItemDataMap: UserItemDataMap;
}
