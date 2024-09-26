import { ProgressionData, UserData } from '../user/userModel';

export type ItemType = 'SKIN' | 'EYES' | 'MOUTH' | 'HAIR' | 'ACCESSORY';

export interface Item {
  id: number;
  imagePath: string;
  createdDateTime: Date;
  itemType: ItemType;
  etc: string;
}

export interface Badge {
  id: number;
  imagePath: string;
  createdDateTime: Date;
}

export interface UserProfileData {
  progressionData: ProgressionData;
  itemSkin: Item;
  itemEyes: Item;
  itemMouth: Item;
  itemHair: Item;
  itemAccessory: Item;
  badge: Badge;
}

export interface FollowData {
  followId: number;
  userData: UserData;
  userProfileData: UserProfileData;
  isMine: boolean;
}

export interface FollowListResponse {
  followCount: number;
  followDataList: FollowData[];
}
