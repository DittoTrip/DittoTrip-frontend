import { AlarmListRequest, AlarmListResponse } from '../models/alarm/alarmModel';
import { api } from './https';

//알람 리스트 조회
export const getAlarmList = async (params: AlarmListRequest) => {
  const response = await api.get<AlarmListResponse>('/alarm/list', { params: { ...params } });
  return response.data;
};
