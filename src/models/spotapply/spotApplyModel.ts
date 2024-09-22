export type SpotApplyStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface SaveReq {
  name: string;
  intro: string;
  address: string;
  startTime: Time;
  endTime: Time;
  phoneNumber: string;
  homeUri: string;
  pointX: number;
  pointY: number;
  categoryIds: number[];
  hashtagNames: string[];
}

export interface SpotSaveRequest {
  saveReq: SaveReq;
  image: string;
  images: string[];
}

export interface SpotApplyMiniData {
  id: number;
  name: string;
  imagePath: string;
  spotApplyStatus: SpotApplyStatus;
  createdDateTime: Date;
}

export interface SpotApplyMiniDataResponse {
  spotApplyMiniDataList: SpotApplyMiniData[];
  totalPages: number;
}

export interface SpotApplyData {
  spotApplyId: number;
  name: string;
  address: string;
  pointX: number;
  pointY: number;
  imagePath: string;
  spotApplyStatus: SpotApplyStatus;
  createdDateTime: Date;
  categoryDataList: CategoryData[];
  hashtags: string[];
  imagePaths: string[];
}

export interface CategoryData {
  categoryId: number;
  name: string;
}

export interface SpotApplyDetailResponse {
  spotApplyData: SpotApplyData;
}
