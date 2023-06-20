import { apiSlice } from "../../app/api/apiSlice";

export const donorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["donors"],
    }),
    updateDetails: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["donors"],
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/users/update-password",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["donors"],
    }),
    deleteAccont: builder.mutation({
      query: () => ({
        url: "/users",
        method: "DELETE",
      }),
      invalidatesTags: ["donors"],
    }),
  }),
});

export const {
  useGetDetailsQuery,
  useUpdateDetailsMutation,
  useChangePasswordMutation,
  useDeleteAccontMutation,
} = donorApiSlice;
