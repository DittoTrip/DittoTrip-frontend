export type ItemType = 'SKIN' | 'EYES' | 'MOUSE' | 'HAIR' | 'ACCESSORY';

export interface UserProfileRequset {
  itemSkinId: number;
  itemEyesId: number;
  itemMouseId: number;
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
  userRewardId: number;
  name: string;
  imagePath: string;
  itemType: ItemType;
  createdDateTime: string;
}

export interface BadgeData {
  rewardId: number;
  name: string;
  body: string;
  conditionBody: string;
  imagePath: string;
  createdDateTime: string;
  userBadgeId: number;
}
export interface ProgressionData {
  presentExp: number;
  requiredExp: number;
  presentLevel: string;
  nextLevel: string;
  progressionRate: number;
}

export interface UserProfileData {
  progressionBar: ProgressionData;
  itemSkin: UserProfileItem;
  itemEyes: UserProfileItem;
  itemMouse: UserProfileItem;
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

export interface UserDataForAdmin {
  userId: 2;
  userStatus: 'NORMAL' | 'BANNED' | 'INACTIVE';
  nickname: string;
  email: string;
  createdDateTime: Date;
  progressionBar: number;
  reviewCount: number;
  dittoCount: number;
  userProfileData: UserProfileData;
}
export interface UserDetailResponse {
  userDataForAdmin: UserDataForAdmin;
  totalPages: number;
}
