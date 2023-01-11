import { apiSlice } from "../../app/api/apiSlice";

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: () => ({
        url: "/fundraisers",
        method: "GET",
      }),
    }),
    updateDetails: builder.mutation({
      query: (body) => ({
        url: "/fundraisers",
        method: "PATCH",
        body,
      }),
    }),

  }),
});

export const {
  useGetDetailsQuery,
  useUpdateDetailsMutation,
} = studentsApiSlice;
