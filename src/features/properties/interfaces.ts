/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponse<T> {
  error: boolean;
  status: number;
  message: string;
  data: T | null;
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  status: string;
  type: string;
  category: string;
  bedrooms: number;
  facilities: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  ratings: {
    _id: string;
    propertyId: string;
    userId: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
  comments: [
    {
      _id: string;
      propertyId: string;
      userId: string;
      content: string;
      replies: [
        {
          userId: string;
          content: string;
          createdAt: string;
          _id: string;
        }
      ];
      createdAt: string;
      updatedAt: string;
    }
  ];
  id: string;
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
  page: number;
  limit: number;
  search?: string;
  category?: string;
}
