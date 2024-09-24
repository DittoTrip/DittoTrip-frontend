import { CategoryData } from '../category/categoryModel';

export interface SpotData {
  spotId: number;
  name: string;
  address: string;
  pointX: number;
  pointY: number;
  imagePath: string;
  rating: number;
  hashtags: string[];
  myBookmarkId: number;
}

export interface SpotImageData {
  spotImageId: number;
  imagePath: string;
}

export interface ReviewData {
  // 미니 리뷰
  reviewId: number;
  username: string;
  rating: number;
  reviewBody: string;
}

export interface SpotDetailResponse {
  spotData: SpotData;
  spotImageDataList: SpotImageData[];
  reviewDataList: ReviewData[];
  mySpotVisitId: number | null;
}

export interface SpotListResponse {
  categoryData: CategoryData;
  spotDataList: SpotData[];
  totalPages: number;
}

export interface SpotSearchListResponse {
  spotDataList: SpotData[];
  spotCount: number;
}

export interface spotMapListRequest {
  categoryId: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface SpotListRequest {
  page: number;
  sort?: string | null;
  search?: string | null;
  userX?: number | null;
  userY?: number | null;
}

export interface SpotVisit {
  spotVisitId: number;
  imagePath: string;
  hashtags: string[];
  spotId: number;
  spotName: string;
  address: string;
  createdDateTime: Date;
  bookmarkId: number;
  reviewMiniData: ReviewData;
}

export interface SpotVisitResponse {
  spotVisitDataList: SpotVisit[];
  count: number;
  totalPages: number;
}
