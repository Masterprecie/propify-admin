/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponse {
  error: boolean;
  status: number;
  message: string;
  data: null | any;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse extends IResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
export interface LoginPayload {
  email: string;
  password: string;
}
