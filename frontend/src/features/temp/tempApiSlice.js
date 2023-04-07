import { apiSlice } from "../../app/api/apiSlice";

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFundraise: builder.query({
      query: (id) => ({
        url: `/temp/${id}`,
        method: "GET",
      }),
    }),
    getAllFundraise: builder.query({
      query: () => ({
        url: `/temp`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetFundraiseQuery,
  useGetAllFundraiseQuery
} = studentsApiSlice;
