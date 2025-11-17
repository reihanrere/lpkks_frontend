import { api } from "@/lib/axios";
import {
  ApiSuccessResponse,
  PaginatedData
} from "@/types/api";
import {
  Product,
  ProductRequest,
  ProductUpdateRequest,
  ProductQueryParams
} from "@/types/product";

const PRODUCT_ENDPOINT = "/products";

/**
 * Get paginated list of products
 */
export const getProducts = async (
  params?: ProductQueryParams
): Promise<PaginatedData<Product>> => {
  const response = await api.get<ApiSuccessResponse<PaginatedData<Product>>>(
    PRODUCT_ENDPOINT,
    { params }
  );

  if (!response.data?.data) {
    throw new Error("Invalid response format");
  }

  return response.data.data;
};

/**
 * Get single product by ID
 */
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<ApiSuccessResponse<Product>>(
    `${PRODUCT_ENDPOINT}/${id}`
  );

  if (!response.data?.data) {
    throw new Error("Invalid response format");
  }

  return response.data.data;
};

/**
 * Create new product
 */
export const createProduct = async (
  data: ProductRequest
): Promise<Product> => {
  const response = await api.post<ApiSuccessResponse<Product>>(
    PRODUCT_ENDPOINT,
    data
  );

  if (!response.data?.data) {
    throw new Error("Invalid response format");
  }

  return response.data.data;
};

/**
 * Update existing product
 */
export const updateProduct = async (
  id: number,
  data: ProductUpdateRequest
): Promise<Product> => {
  const response = await api.put<ApiSuccessResponse<Product>>(
    `${PRODUCT_ENDPOINT}/${id}`,
    data
  );

  if (!response.data?.data) {
    throw new Error("Invalid response format");
  }

  return response.data.data;
};

/**
 * Delete product
 */
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`${PRODUCT_ENDPOINT}/${id}`);
};