export interface UserData {
  // ReviewData의 부하 1
  userId: number;
  userName: string;
}

export interface ReviewData {
  // SpotReviewResponse의 부하 1 , sport/{spotId}/review/list api의 부하 1이기도함
  reviewId: number;
  rating: number;
  reviewBody: string;
  likes: number;
  createdDateTime: Date;
  userData: UserData;
  imagePaths: string[];
  isMine: boolean;
  myLike: boolean;
  commentsCount: number;
}

export interface ReviewCommentData {
  // SpotReviewResponse의 부하 2
  commentId: number;
  body: string;
  createdDateTime: Date;
  userData: UserData;
  isMine: boolean;
}

export interface SpotReviewResponse {
  // 겟 review/{reviewid} api
  spotName: string;
  reviewData: ReviewData;
  reviewCommentDataList: ReviewCommentData[];
}

export interface ReviewModifyReq {
  // ReviewModifyRequset의 부하 1
  rating: number;
  reviewBody: string;
  removedImageIds: number[];
}

export interface ReviewModifyRequset {
  // 풋 review/{reviewid} api
  reviewModifyReq: ReviewModifyReq;
  images: string[];
}

export interface ReviewSaveReq {
  // ReviewSaveRequest의 부하 1
  rating: number;
  reviewBody: string;
}

export interface ReviewSaveRequest {
  // 포스트 review api
  reviewSaveReq: ReviewSaveReq;
  images: string[];
}

export interface ReviewPageRequest {
  // 겟 sport/{spotId}/review/list api
  page: number;
  size: number;
  sort: string;
}

export interface ReviewListResponse {
  // 겟 sport/{spotId}/review/list api
  reviewsCount: number;
  rating: number;
  reviewDataList: ReviewData[];
  totalPage: number;
}
