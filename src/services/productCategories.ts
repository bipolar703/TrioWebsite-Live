import { ProductCategory } from '../types/productCategory';

export async function fetchProductCategories(): Promise<ProductCategory[]> {
  try {
    const response = await fetch('/api/product-categories');
    if (!response.ok) throw new Error('Failed to fetch product categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return [];
  }
}

export async function createProductCategory(productCategory: Omit<ProductCategory, 'id'>): Promise<ProductCategory> {
  try {
    const response = await fetch('/api/product-categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productCategory),
    });
    if (!response.ok) throw new Error('Failed to create product category');
    return await response.json();
  } catch (error) {
    console.error('Error creating product category:', error);
    throw error;
  }
}

export async function updateProductCategory(id: string, productCategory: Omit<ProductCategory, 'id'>): Promise<ProductCategory> {
  try {
    const response = await fetch(`/api/product-categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productCategory),
    });
    if (!response.ok) throw new Error('Failed to update product category');
    return await response.json();
  } catch (error) {
    console.error('Error updating product category:', error);
    throw error;
  }
}

export async function deleteProductCategory(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/product-categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product category');
  } catch (error) {
    console.error('Error deleting product category:', error);
    throw error;
  }
}