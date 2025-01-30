import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/utils/baseQuery";
import {
  GetUsersParams,
  PaginatedResponse,
  User,
  IResponse,
} from "./interfaces";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllUsers: builder.query<PaginatedResponse<User>, GetUsersParams>({
      query: ({ page, limit, search }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (search) params.append("search", search);
        return {
          url: `/user?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getAUser: builder.query<User, string | number>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation<IResponse<User>, void>({
      query: () => ({
        url: `/user`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetAUserQuery, useEditUserMutation } =
  userApi;
