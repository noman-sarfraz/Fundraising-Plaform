import { apiSlice } from "../../app/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery
} = categoryApiSlice;
