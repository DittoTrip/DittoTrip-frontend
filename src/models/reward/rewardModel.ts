export type ItemType = 
"SKIN"
| "EYES"
| "MOUSE"
| "HAIR"
| "ACCESSORY" ;

export interface UserBadgeData {
    badgeId: number;
    imagePath: string;
    acquiredDateTime: Date;
  }
  
export interface RewardResponse { // user/{userId}/bedge/list api
    userBadgeDataList: UserBadgeData[];
  }

export interface Item {
    id: number;
    imagePath: string;
    createdDateTime: Date;
    itemType: ItemType;
  }

export interface UserItemDataMap{
    additionalProp1 : Item[];
    additionalProp2 : Item[];
    additionalProp3 : Item[];

}

export interface UserItemListResponse{ // item/list api
    userItemDataMap: UserItemDataMap;
}