import { apiSlice } from "../../app/api/apiSlice";

export const donorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: () => ({
        url: "/donors",
        method: "GET",
      }),
      providesTags: ["donors"],
    }),
    updateDetails: builder.mutation({
      query: (body) => ({
        url: "/donors",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["donors"],
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/donors/change-password",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["donors"],
    }),
    deleteAccont: builder.mutation({
      query: () => ({
        url: "/donors",
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
