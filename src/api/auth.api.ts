import { LoginProps } from '../pages/Login';
import { httpClient } from './http';

interface LoginResponse {
  token: string;
}
export const login = async (data: LoginProps) => {
  const response = await httpClient.post<LoginResponse>('/login', data);
  return response.data;
};
