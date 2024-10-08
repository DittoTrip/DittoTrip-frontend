export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SendCodeResponse {
  result: boolean;
}

export interface VerifyCodeProps {
  email: string;
  code: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface SendCodeProps {
  email: string;
}
export interface SendPasswordProps {
  email: string;
}
export interface VerifyCodeProps {
  email: string;
  code: string;
}

export interface JoinProps {
  email: string;
  password: string;
  nickname: string;
  code: string;
}

export interface DuplicationProps {
  email?: string;
  nickname?: string;
}
export interface EditPasswordProps {
  originPassword: string;
  newPassword: string;
}
