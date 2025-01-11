export interface ProductCategory {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}