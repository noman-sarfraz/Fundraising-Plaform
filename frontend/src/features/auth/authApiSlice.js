import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (parameters) => ({
        url: "/verify-email",
        method: "POST",
        body: { ...parameters },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (parameters) => ({
        url: "/forgot-password",
        method: "POST",
        body: { ...parameters },
      }),
    }),
    resetPassword: builder.mutation({
      query: (parameters) => ({
        url: "/reset-password",
        method: "POST",
        body: { ...parameters },
      }),
    }),
    
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyEmailMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApiSlice;
