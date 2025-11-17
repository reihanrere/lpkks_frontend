import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "@/features/product/api/productApi";
import {
  Product,
  ProductRequest,
  ProductUpdateRequest,
  ProductQueryParams
} from "@/types/product";
import { PaginatedData } from "@/types/api";
import { ApiError } from "@/lib/axios";

// Query Keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params?: ProductQueryParams) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

/**
 * Hook untuk get product list dengan pagination
 */
export const useProducts = (
  params?: ProductQueryParams,
  options?: Omit<UseQueryOptions<PaginatedData<Product>>, 'queryKey' | 'queryFn'>
) => {

  const finalParams: ProductQueryParams = {
    page: params?.page ?? 1,
    size: params?.size ?? 10,
    search: params?.search,
    sort_by: params?.sort_by,
    sort_order: params?.sort_order,
  };

  return useQuery({
    queryKey: productKeys.list(finalParams),
    queryFn: () => getProducts(finalParams),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

/**
 * Hook untuk get single product
 */
export const useProduct = (
  id: number,
  options?: Omit<UseQueryOptions<Product>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
    ...options,
  });
};

/**
 * Hook untuk create product
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      toast.success("Product created successfully!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to create product");
    },
  });
};

/**
 * Hook untuk update product
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductUpdateRequest }) =>
      updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
      toast.success("Product updated successfully!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to update product");
    },
  });
};

/**
 * Hook untuk delete product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.removeQueries({ queryKey: productKeys.detail(id) });
      toast.success("Product deleted successfully!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Failed to delete product");
    },
  });
};