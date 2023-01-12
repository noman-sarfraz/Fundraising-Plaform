import { apiSlice } from "../../app/api/apiSlice";

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: () => ({
        url: "/donors",
        method: "GET",
      }),
    }),
    updateDetails: builder.mutation({
      query: (body) => ({
        url: "/donors",
        method: "PATCH",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/donors/change-password",
        method: "PATCH",
        body,
      }),
    }),
    deleteAccont: builder.mutation({
      query: () => ({
        url: "/donors",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDetailsQuery,
  useUpdateDetailsMutation,
  useChangePasswordMutation,
  useDeleteAccontMutation

} = studentsApiSlice;
