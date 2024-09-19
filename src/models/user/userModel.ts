import { UserData } from '../userpage/userPageModel';

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
export interface SearchUserResponse {
  userDataList: UserData[];
  totalPages: 0;
}
