import { apiSlice } from "../../app/api/apiSlice";

export const fundraiserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFundraiserDetails: builder.query({
      query: () => ({
        url: "/fundraisers",
        method: "GET",
      }),
      providesTags: ["fundraisers"],
    }),
    updateFundraiserDetails: builder.mutation({
      query: (body) => ({
        url: "/fundraisers",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["fundraisers"],
    }),
    changeFundraiserPassword: builder.mutation({
      query: (body) => ({
        url: "/fundraisers/change-password",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["fundraisers"],
    }),
    deleteFundraiserAccont: builder.mutation({
      query: () => ({
        url: "/fundraisers",
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
