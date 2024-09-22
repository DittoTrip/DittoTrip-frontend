export type ItemType = 'SKIN' | 'EYES' | 'MOUSE' | 'HAIR' | 'ACCESSORY';

export interface UserBadgeData {
  badgeId: number;
  imagePath: string;
  acquiredDateTime: Date;
}

export interface UserBadgeResponse {
  // user/{userId}/bedge/list api
  userBadgeDataList: UserBadgeData[];
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
