import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/utils/baseQuery";
import {
  IResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "./interfaces";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<IResponse, RegisterPayload>({
      query: (credentials) => ({
        url: `/auth/register`,
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<IResponse, void>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
