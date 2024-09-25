import { BadgeData } from '../reward/rewardModel';
import { ProgressionData, UserData } from '../user/userModel';

export type ItemType = 'SKIN' | 'EYES' | 'MOUSE' | 'HAIR' | 'ACCESSORY';

export interface Item {
  id: number;
  imagePath: string;
  createdDateTime: Date;
  itemType: ItemType;
  etc: string;
}

export interface UserProfileData {
  progressionBar: ProgressionData;
  itemSkin: Item;
  itemEyes: Item;
  itemMouse: Item;
  itemHair: Item;
  itemAccessory: Item;
  badgeData: BadgeData;
}

export interface DittoMiniData {
  dittoId: number;
  title: string;
  imagePath: string;
  userData: UserData;
}

export interface UserPageResponse {
  userData: UserData;
  userProfileData: UserProfileData;
  dittoMiniDataList: DittoMiniData[];
  followingCount: number;
  followedCount: number;
  isMine: boolean;
  isNotCheckedAlarm: boolean;
  myFollowingId: number;
}
