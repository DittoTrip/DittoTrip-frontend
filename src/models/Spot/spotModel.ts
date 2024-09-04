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
