export interface AlarmListRequest {
  page: number;
  size: number;
}

export interface AlarmData {
  alarmId: number;
  title: string;
  body: string;
  path: string;
  isChecked: boolean;
  createdDateTime: Date;
}

export interface AlarmListResponse {
  alarmDataList: AlarmData[];
  totalPage: number;
}
