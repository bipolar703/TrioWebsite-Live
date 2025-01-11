import { useState, useEffect } from 'react';
import { ProductCategory } from '../types/productCategory';
import { useAuth } from './useAuth';

export function useProductCategories() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/product-categories');
      if (!response.ok) {
        throw new Error('Failed to fetch product categories');
      }
      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch product categories');
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category: Omit<ProductCategory, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/product-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(category)
      });

      if (!response.ok) {
        throw new Error('Failed to add product category');
      }

      await fetchCategories();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to add product category');
    }
  };

  const updateCategory = async (id: number, category: Omit<ProductCategory, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch(`/api/product-categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(category)
      });

      if (!response.ok) {
        throw new Error('Failed to update product category');
      }

      await fetchCategories();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to update product category');
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const response = await fetch(`/api/product-categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product category');
      }

      await fetchCategories();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to delete product category');
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory
  };
}