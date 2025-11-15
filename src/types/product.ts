export interface Product {
  id: number;
  name: string;
  price: number;
  updated_at: Date;
}

export interface ProductRequest {
  product_name: string;
  qty: number;
}