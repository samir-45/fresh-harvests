import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Product = {
  id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginReq = { email: string; password: string };
export type LoginRes = ApiResponse<{ token: string }>;

export type RegisterReq = { fullName: string; email: string; password: string };
export type RegisterRes = ApiResponse<{
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}>;

// payload for POST /products – must match Postman example
export type CreateProductReq = {
  productName: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
};


export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          // Postman example: Authorization: <token> (no Bearer)
          headers.set("Authorization", token);
        }
      }
      return headers;
    },
  }),

  tagTypes: ["Products", "Categories"],

  endpoints: (builder) => ({
    // Auth
    login: builder.mutation<LoginRes, LoginReq>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<RegisterRes, RegisterReq>({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),

    // Public data
    getProducts: builder.query<ApiResponse<Product[]>, void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => `/products/${id}`,
    }),
    getCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => "/category",
      providesTags: ["Categories"],
    }),

    // Admin data
    // Create category (admin)
    addCategory: builder.mutation<ApiResponse<Category>, { categoryName: string }>({
      query: (body) => ({
        url: "/category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),


    // Admin CRUD (protected by Authorization token)
    addProduct: builder.mutation<ApiResponse<Product>, CreateProductReq>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProductById: builder.mutation<
      ApiResponse<Product>,
      { id: string; body: Partial<CreateProductReq> }
    >({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProductById: builder.mutation<ApiResponse<Product>, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useAddProductMutation,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation,
} = api;
