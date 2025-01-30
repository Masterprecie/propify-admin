import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/utils/baseQuery";
import {
  GetUsersParams,
  PaginatedResponse,
  IResponse,
  Property,
} from "./interfaces";

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllProperties: builder.query<
      PaginatedResponse<Property>,
      GetUsersParams
    >({
      query: ({ page, limit, category, search }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (category) params.append("category", category);
        if (search) params.append("search", search);
        return {
          url: `/property?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    postProperty: builder.mutation<IResponse<Property>, Property>({
      query: (payload) => ({
        url: `/property`,
        method: "POST",
        body: payload,
      }),
    }),
    getAProperty: builder.query<Property, string | number>({
      query: (id) => ({
        url: `/property/${id}`,
        method: "GET",
      }),
    }),
    editProperty: builder.mutation<IResponse<Property>, void>({
      query: (id) => ({
        url: `/property/${id}`,
        method: "PUT",
      }),
    }),
    deleteProperty: builder.mutation<IResponse<Property>, void>({
      query: (id) => ({
        url: `/property/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllPropertiesQuery,
  usePostPropertyMutation,
  useGetAPropertyQuery,
  useEditPropertyMutation,
  useDeletePropertyMutation,
} = propertyApi;
