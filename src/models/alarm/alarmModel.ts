export interface AlarmListRequest { // 겟 alarm/list api
    page: number;
    size: number;
    sort: string[];
  }

export interface AlarmData { // 부하에요 알죠?
    alarmId: number;
    title: string;
    body: string;
    path: string;
    isChecked: boolean;
    createdDateTime: Date;
  }
  
export interface AlarmListResponse { // 겟 alarm/list api
    alarmDataList: AlarmData[];
    totalPage: number;
  }