import {
  DuplicationProps,
  JoinProps,
  LoginProps,
  LoginResponse,
  SendCodeProps,
  SendCodeResponse,
  VerifyCodeProps,
} from '../models/login/loginModel';
import { api } from './https';

export const login = async (data: LoginProps) => {
  const response = await api.post<LoginResponse>('/auth/login', { ...data });
  return response.data;
};
export const logout = async () => {
  const response = await api.delete(`auth/logout`);
  return response.status;
};

export const refreshToken = async () => {
  const response = await api.post<LoginResponse>('/auth/refresh');
  return response.data;
};
export const sendCode = async (data: SendCodeProps) => {
  const response = await api.get<SendCodeResponse>(`/auth/send-code?email=${data.email}`);
  return response.data;
};
export const varifyCode = async (data: VerifyCodeProps) => {
  const response = await api.post(`auth/verify-code`, { ...data });
  return response.data;
};
export const join = async (data: JoinProps) => {
  const response = await api.post(`auth/signup`, { ...data });
  return response.data;
};

export const duplicationCheck = async (data: DuplicationProps) => {
  // const response = await api.get(`auth/duplication-check?email=${data.email}&nickname=${data.nickname}`);
  const response = await api.get(`auth/duplication-check?nickname=${data.nickname}`);
  return response.data;
};
