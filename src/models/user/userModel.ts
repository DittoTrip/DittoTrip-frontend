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
  itemType: 'SKIN';
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

export interface UserProfileData {
  progressionBar: number;
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
