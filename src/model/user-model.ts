export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export function toLoginResponse(token: string): LoginResponse {
  return {
    token: token,
  };
}
