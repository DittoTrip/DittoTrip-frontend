export interface DittoCommentParameter { // 풋 ditto/{dittoId}/comment/{commentId} api의 파라미터를 위한 친구
    dittoId : number;
    commentId : number;
}

export interface DittoCommentResponse { // 풋과 포스트 둘다 쓰는친구
    body : string;
}

export interface DittoChildCommentParameter { // 아마도 대댓글을 달기 위한 api의 파라미터를 위한 친구? 아마도 ?..
    dittoId : number;
    parentCommentId : number;
}