import { apiSlice } from "../../app/api/apiSlice";

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompaigns: builder.query({
      query: () => ({
        url: "/campaigns/get-all",
        method: "GET",
      }),
    }),
    changeCampaignStatus: builder.mutation({
      query: (body) => ({
        url: `/campaigns/change-status/${body.id}`,
        method: "PATCH",
        body: {
          status: body.status
        },
      })
    })
  }),
});

export const {
  useGetAllCompaignsQuery,
  useChangeCampaignStatusMutation
} = studentsApiSlice;