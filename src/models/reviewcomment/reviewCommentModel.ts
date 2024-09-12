export interface ReviewCommentParameter { // 풋 델리트 review/{reviewId}/comment/{commentId} api의 파라미터를 위한 친구
    reviewId : number;
    commentId : number;
}

export interface ReviewCommentRequest { // 풋 review/{reviewId}/comment/{commentId} 과 포스트 review/{reviewId}/comment에서 둘다 쓸 수 있다.
    body : string;
}

export interface ReviewChildCommentParameter { // 포스트 review/{reviewId}/comment api의 파라미터를 위한 친구 아마도? 정확히는 모르겠네 아마도 맞음
    reviewId : number;
    parentCommentId : number;
}