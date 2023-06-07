import { apiSlice } from "../../app/api/apiSlice";

export const fundraiserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFundraiserDetails: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["fundraisers"],
    }),
    updateFundraiserDetails: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["fundraisers"],
    }),
    changeFundraiserPassword: builder.mutation({
      query: (body) => ({
        url: "/users/update-password",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["fundraisers"],
    }),
    deleteFundraiserAccont: builder.mutation({
      query: () => ({
        url: "/users",
        method: "DELETE",
      }),
      invalidatesTags: ["fundraisers"],
    }),
  }),
});

export const {
  useGetFundraiserDetailsQuery,
  useChangeFundraiserPasswordMutation,
  useDeleteFundraiserAccontMutation,
  useUpdateFundraiserDetailsMutation,
} = fundraiserApiSlice;
