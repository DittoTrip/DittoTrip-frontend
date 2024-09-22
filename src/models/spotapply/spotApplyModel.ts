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
  imagePage: string;
  spotApplyStatus: SpotApplyStatus;
  createdDateTime: Date;
}

export interface SpotApplyMiniDataResponse {
  spotApplyMiniDataList: SpotApplyMiniData[];
  totalPages: number;
}
