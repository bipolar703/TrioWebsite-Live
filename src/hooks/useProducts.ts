import { useState, useEffect } from 'react';
import productsData from '../data/products.json';

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  image: string;
  description: string;
  specifications?: Record<string, string>;
  features?: string[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories?: { id: string; name: string; }[];
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setProducts(productsData.products);
      setCategories(productsData.categories);
      setLoading(false);
    } catch (err) {
      setError('Error loading products');
      setLoading(false);
    }
  }, []);

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(product => product.category === categoryId);
  };

  const getProductsBySubcategory = (subcategoryId: string) => {
    return products.filter(product => product.subcategory === subcategoryId);
  };

  const getFeaturedProducts = (limit = 6) => {
    return [...products]
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  };

  const searchProducts = (query: string) => {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  };

  return {
    products,
    categories,
    loading,
    error,
    getProductsByCategory,
    getProductsBySubcategory,
    getFeaturedProducts,
    searchProducts
  };
} 