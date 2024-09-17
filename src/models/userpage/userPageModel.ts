export type ItemType = 'SKIN' | 'EYES' | 'MOUSE' | 'HAIR' | 'ACCESSORY';

export interface UserData {
  userId: number;
  nickname: string;
}

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
  progressionBar: number;
  itemSkin: Item;
  itemEyes: Item;
  itemMouse: Item;
  itemHair: Item;
  itemAccessory: Item;
  badge: Badge;
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
}
