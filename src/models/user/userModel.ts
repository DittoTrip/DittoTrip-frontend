import { BadgeData } from '../reward/rewardModel';

export type ItemType = 'SKIN' | 'EYES' | 'MOUTH' | 'HAIR' | 'ACCESSORY';

export interface UserProfileRequset {
  itemSkinId: number;
  itemEyesId: number;
  itemMouthId: number;
  itemHairId: number;
  itemAccessoryId: number;
  badgeId: number;
}

export interface SearchUserRequset {
  query: string;
  page: number;
  size: number;
}

export interface UserProfileItem {
  itemId: number;
  userRewardId: number;
  name: string;
  imagePath: string;
  wearingImagePath: string;
  itemType: ItemType;
  createdDateTime: string;
}

export interface ProgressionData {
  presentExp: number;
  requiredExp: number;
  presentLevel: string;
  nextLevel: string;
  progressionRate: number;
}

export interface UserProfileData {
  progressionData: ProgressionData;
  itemSkin: UserProfileItem;
  itemEyes: UserProfileItem;
  itemMouth: UserProfileItem;
  itemHair: UserProfileItem;
  itemAccessory: UserProfileItem;
  badgeData: BadgeData;
}

export interface UserData {
  userId: number;
  nickname: string;
  userProfileData: UserProfileData;
  isMine: boolean;
}

export interface SearchUserResponse {
  userDataList: UserData[];
  totalPages: number;
}
export interface MyUserInfoData {
  nickname: string;
  email: string;
  userProfileData: UserProfileData;
}

export interface UserDetailResponse {
  myUserInfoData: MyUserInfoData;
  totalPages: number;
}
