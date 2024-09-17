export interface UserData {
  userId: number;
  nickname: string;
}

export interface DittoData {
  dittoId: number;
  title: string;
  body: string;
  createdDateTime: Date;
  userData: UserData;
  imagePath: string;
  hashtags: string[];
  isMine: boolean;
  myBookmarkId: number;
}

export interface CommentData {
  commentId: number;
  body: string;
  createdDateTime: Date;
  userData: UserData;
  isMine: boolean;
  childCommentDataList: CommentData[];
}

export interface DittoDetailResponse {
  dittoData: DittoData;
  commentDataList: CommentData[];
  commentCount: number;
  bookmarkCount: number;
  isMyFollowing: boolean;
}

export interface ModifyReq {
  title: string;
  body: string;
  removedImageIds: number[];
}

export interface DittoModifyRequest {
  modifyReq: ModifyReq;
  images: string[];
}

export interface SaveReq {
  title: string;
  body: string;
  hashtagNames: string[];
}

export interface DittoSaveRequest {
  saveReq: SaveReq;
  images: string[];
}

export interface DittoPageRequest {
  page: number;
  size: number;
}

export interface DittoMiniData {
  dittoId: number;
  title: string;
  imagePath: string;
  userData: UserData;
}

export interface DittoListResponse {
  dittoMiniDataList: DittoMiniData[];
  totalPage: number;
}
