export type ItemType = 
"SKIN"
| "EYES"
| "MOUSE"
| "HAIR"
| "ACCESSORY" ;

export interface UserData {
    userId: number;
    userName: string;
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

export interface FollowData {
    followId: number;
    userData: UserData;
    userProfileData: UserProfileData;
    isMine: boolean;
  }

export interface FollowListResponse { // 겟 following-list/{userId} 와 followed-list/{userId}에서 둘다 사용가능
    followCount: number;
    followDataList: FollowData[];
  }
