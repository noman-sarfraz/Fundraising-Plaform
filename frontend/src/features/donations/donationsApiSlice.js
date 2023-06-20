import { apiSlice } from "../../app/api/apiSlice";

export const donationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDonation: builder.mutation({
      query: (body) => ({
        url: `/donations`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["donations"],
    }),
    getDonation: builder.query({
      query: (id) => ({
        url: `/donations/${id}`,
        method: "GET",
      }),
      providesTags: ["donations"],
    }),
    getMyDonations: builder.query({
      query: () => ({
        url: `/donations`,
        method: "GET",
      }),
      providesTags: ["donations"],
    }),
    getCampaignDonations: builder.query({
      query: (campaignId) => ({
        url: `/get-donations/${campaignId}`,
        method: "GET",
      }),
      providesTags: ["donations"],
    }),
  }),
});

export const {
  useCreateDonationMutation,
  useGetCampaignDonationsQuery,
  useGetDonationQuery,
  useGetMyDonationsQuery,
} = donationsApiSlice;
