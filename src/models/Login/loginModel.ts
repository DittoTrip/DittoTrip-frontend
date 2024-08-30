export interface LoginResponse {
  token: string;
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
  email: string;
  nickname: string;
}
