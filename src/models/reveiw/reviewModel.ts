import { CommentData } from '../ditto/dittoModel';
import { UserData } from '../user/userModel';

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

export interface SpotReviewResponse {
  spotName: string;
  reviewData: ReviewData;
  commentDataList: CommentData[];
}

export interface ReviewModifyReq {
  rating: number;
  reviewBody: string;
  removedImageIds: number[];
}

export interface ReviewModifyRequset {
  reviewModifyReq: ReviewModifyReq;
  images: string[];
}

export interface ReviewSaveReq {
  rating: number;
  reviewBody: string;
}

export interface ReviewSaveRequest {
  reviewSaveReq: ReviewSaveReq;
  images: string[];
}

export interface ReviewPageRequest {
  page: number;
  size: number;
  sort: string;
}

export interface ReviewListResponse {
  reviewsCount: number;
  rating: number;
  reviewDataList: ReviewData[];
  totalPage: number;
}
