export interface Product {
  id: number;
  category_id: number;
  name: string;
  description: string;
  features: string;
  specifications: string;
  image: string;
  slug: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
} 