export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  image: string;
  description: string;
}

export interface CategoryCardProps {
  category: string;
  label: string;
  icon: React.ReactNode;
  count: number;
} 