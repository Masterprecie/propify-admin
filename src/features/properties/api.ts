import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/utils/baseQuery";
import {
  GetUsersParams,
  PaginatedResponse,
  IResponse,
  Property,
  PropertyPayload,
} from "./interfaces";

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Property", "SingleProperty"],
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
      providesTags: [{ type: "Property" }],
    }),
    postProperty: builder.mutation<IResponse<Property>, PropertyPayload>({
      query: (payload) => ({
        url: `/property`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Property" }],
    }),
    getAProperty: builder.query<Property, string | null>({
      query: (id) => ({
        url: `/property/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "SingleProperty" }],
    }),
    editProperty: builder.mutation<
      IResponse<Property>,
      { payload: PropertyPayload; id: string }
    >({
      query: ({ payload, id }: { payload: PropertyPayload; id: string }) => ({
        url: `/property/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [{ type: "Property" }, { type: "SingleProperty" }],
    }),
    deleteProperty: builder.mutation<IResponse<Property>, string>({
      query: (id) => ({
        url: `/property/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Property" }],
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
