export type ReportReasonType = 
 "BLAME"
| "ILLEGAL_INFORMATION"
| "BUSINESS"
| "PERSONAL_INFORMATION_EXPOSURE"
| "SENSATIONAL_CONTENTS"
| "ILLEGAL_NICKNAME"
| "ETC" ;

export type ReportTargetType = 
"REVIEW"
| "REVIEW_COMMENT"
| "DITTO"
| "DITTO_COMMENT"
| "USER" ;

export interface ReportRequest { // 포스트 report api
    reportReasonType : ReportReasonType;
    reportTargetType : ReportTargetType;
    targetId : number;
}

export interface ReportAdminRequest { // 포스트 report/{reportId} api 
    shouldDeleteContent: boolean;
    shouldPermanentlyBan: boolean;
    suspensionDays: number;
}

export interface ReportPageRequest { // 겟 report/list api
    page: number;
    size: number;
    sort: string[];
  }

export interface UserData {
    userId: number;
    userName: string;
  }

export interface ReportData {
    reportId: number;
    reportReasonType : ReportReasonType;
    reportTargetType : ReportTargetType;
    isHandled: boolean;
    createdDateTime: Date;
    userData: UserData;
    targetId: number;
  }

export interface ReportListResponse { // 겟 report/list api
    reportDataList: ReportData[];
    totalPage: number; 
  }