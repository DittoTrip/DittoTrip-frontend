import{
    AlarmListResponse
}from '../models/alarm/alarmModel'
import { api } from './https';

//알람 리스트 조회
export const findAlarmList = async() => {
    const response = await api.get<AlarmListResponse>('/alarm/list');
    return response.data;
}