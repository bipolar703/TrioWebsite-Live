import { Product } from '../types/product';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(id: string, product: Omit<Product, 'id'>): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
} 