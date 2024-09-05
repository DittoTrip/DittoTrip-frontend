export interface UserData { // DittoData의 부하
    userId: number;
    userName: string;
  }

export interface DittoData { // ditto/{dittoId} api의 부하 1
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

export interface ParentDittoCommentData { // ditto/{dittoId} api의 부하2
    dittoCommentId: number;
    body: string;
    createdDateTime: Date;
    userData: UserData;
    isMine: boolean;
  }

export interface DittoDetailResponse { // 겟 ditto/{dittoId} api
    dittoData: DittoData;
    parentDittoCommentDataList: ParentDittoCommentData[];
    commentCount: number;
  }

export interface ModifyReq { // DittoModifyRequset의 부하 1
    title: string;
    body: string;
    removedImageIds: number[];
  }
  
export interface DittoModifyRequest { // 풋 ditto/{dittoId} api
    modifyReq: ModifyReq;
    images: string[]; 
  }

export interface SaveReq { // DittoSaveRequest의 부하 1
    title: string;
    body: string;
    hashtagNames: string[];
  }
  
export interface DittoSaveRequest { // 포스트 ditto api
    saveReq: SaveReq;
    images: string[]; 
  }

export interface DittoPageRequest { // 겟 ditto/list api과 겟 ditto/list/bookmark api
    page: number;
    size: number;
    sort: string[];
  }

export interface DittoMiniData { // DittoListResponse의 부하 1
    dittoId: number;
    title: string;
    imagePath: string;
    userData: UserData;
  }

export interface DittoListResponse { // 겟 ditto/list api과 겟 ditto/list/bookmark api
    dittoMiniDataList: DittoMiniData[];
    totalPage: number;
  }