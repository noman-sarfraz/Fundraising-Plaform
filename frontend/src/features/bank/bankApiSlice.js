import { apiSlice } from "../../app/api/apiSlice";

export const bankApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanks: builder.query({
      query: () => ({
        url: "/banks",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllBanksQuery
} = bankApiSlice;