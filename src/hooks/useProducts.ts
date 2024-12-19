import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { useAuth } from './useAuth';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      await fetchProducts();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to add product');
    }
  };

  const updateProduct = async (id: number, product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      await fetchProducts();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to update product');
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      await fetchProducts();
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to delete product');
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct
  };
} 