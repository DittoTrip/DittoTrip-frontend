import { ReportRequest, ReportAdminRequest, ReportPageRequest, ReportListResponse } from '../models/report/reportModel';
import { api } from './https';

//신고 등록
export const addReport = async (data: ReportRequest) => {
  const response = await api.post('/report', { ...data });
  return response.status;
};

//신고 처리
export const addReportResult = async (reportId: string, data: ReportAdminRequest) => {
  const response = await api.post(`/report/${reportId}`, { data });
  return response.status;
};

//신고 리스트 조회
export const findReportList = async (data: ReportPageRequest) => {
  const response = await api.get<ReportListResponse>(`/report/list`, { data });
  return response.data;
};
