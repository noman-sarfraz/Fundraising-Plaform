import { apiSlice } from "../../app/api/apiSlice";

export const campaignApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllcampaigns: builder.query({
      query: () => ({
        url: "/campaigns/get-all",
        method: "GET",
      }),
      providesTags: ["campaigns"],
    }),
    getApprovedCampaigns: builder.query({
      query: () => ({
        url: "/campaigns/get-approved",
        method: "GET",
      }),
      providesTags: ["campaigns"],
    }),
    getCampaigns: builder.query({
      query: () => ({
        url: `/campaigns`,
        method: "GET",
      }),
      providesTags: ["campaigns"],
    }),
    getCampaign: builder.query({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "GET",
      }),
      providesTags: ["campaigns"],
    }),
    changeCampaignStatus: builder.mutation({
      query: (body) => ({
        url: `/campaigns/change-status/${body.id}`,
        method: "PATCH",
        body: {
          status: body.status,
        },
      }),
      invalidatesTags: ["campaigns"],
    }),
    stopCampaign: builder.mutation({
      query: (id) => ({
        url: `/campaigns/stop/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["campaigns"],
    }),

    createCampaign: builder.mutation({
      query: (body) => ({
        url: "/campaigns",
        method: "POST",
        body,
      }),
      invalidatesTags: ["campaigns"],
    }),
    updateCampaign: builder.mutation({
      query: (body) => ({
        url: `/campaigns/${body._id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["campaigns"],
    }),

    deleteCampaign: builder.mutation({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["campaigns"],
    }),
  }),
});

export const {
  useGetAllcampaignsQuery,
  useChangeCampaignStatusMutation,
  useGetApprovedCampaignsQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useGetCampaignQuery,
  useDeleteCampaignMutation,
  useGetCampaignsQuery,
  useStopCampaignMutation,
} = campaignApiSlice;
