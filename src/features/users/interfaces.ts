/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponse<T> {
  error: boolean;
  status: number;
  message: string;
  data: T | null;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  profilePicture: string;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  data: {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}
