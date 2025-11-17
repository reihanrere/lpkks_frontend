export interface Product {
  id: number;
  name: string;
  qty: number;
  updated_at: string | null;
}

export interface ProductListData {
  data: Product[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface ProductRequest {
  product_name: string;
  qty: number;
}

export interface ProductUpdateRequest {
  product_name?: string;
  qty?: number;
}

export interface ProductQueryParams {
  page?: number;
  size?: number;
  search?: string;
  sort_by?: 'name' | 'qty' | 'updated_at';
  sort_order?: 'asc' | 'desc';
}