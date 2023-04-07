import { apiSlice } from "../../app/api/apiSlice";

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFundraiserDetails: builder.query({
      query: () => ({
        url: "/fundraisers",
        method: "GET",
      }),
    }),
    updateFundraiserDetails: builder.mutation({
      query: (body) => ({
        url: "/fundraisers",
        method: "PATCH",
        body,
      }),
    }),
    changeFundraiserPassword: builder.mutation({
      query: (body) => ({
        url: "/fundraisers/change-password",
        method: "PATCH",
        body,
      }),
    }),
    deleteFundraiserAccont: builder.mutation({
      query: () => ({
        url: "/fundraisers",
        method: "DELETE",
      }),
    }),
    createCampaign: builder.mutation({
      query: (body) => ({
        url: "/campaigns",
        method: "POST",
        body,
      }),
    }),
    getCampaign: builder.query({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "GET",
      }),
    }),
    getCampaigns: builder.query({
      query: () => ({
        url: `/campaigns`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetFundraiserDetailsQuery,
  useChangeFundraiserPasswordMutation,
  useDeleteFundraiserAccontMutation,
  useUpdateFundraiserDetailsMutation,
  useCreateCampaignMutation,
  useGetCampaignQuery,
  useGetCampaignsQuery,


} = studentsApiSlice;
