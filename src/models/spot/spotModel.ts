import { CategoryData } from '../Category/categoryModel';

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
