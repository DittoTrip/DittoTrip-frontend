export type ItemType = 'SKIN' | 'EYES' | 'MOUSE' | 'HAIR' | 'ACCESSORY';

export interface UserBadgeData {
  rewardId: number;
  name: string;
  body: string;
  conditionBody: string;
  imagePath: string;
  createdDateTime: Date;
  userBadgeId: number;
}

export interface UserBadgeResponse {
  // user/{userId}/bedge/list api
  badgeDataList: UserBadgeData[];
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
  MOUSE: Item[];
  HAIR: Item[];
  ACCESSORY: Item[];
}

export interface UserItemListResponse {
  userItemDataMap: UserItemDataMap;
}
