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
  imagePaths: string[];
  hashtags: string[];
  isMine: boolean;
  myBookmarkId: number;
}

export interface DittoCommentData {
  dittoCommentId: number;
  body: string;
  createdDateTime: Date;
  userData: UserData;
  isMine: boolean;
  parentDittoCommentDataList: DittoCommentData[];
}

export interface DittoDetailResponse {
  dittoData: DittoData;
  parentDittoCommentDataList: DittoCommentData[];
  commentCount: number;
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
