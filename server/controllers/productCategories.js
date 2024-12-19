import { pool } from '../db.js';

// Get all product categories
export const getProductCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM product_categories ORDER BY order_index ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    res.status(500).json({ message: 'Error fetching product categories' });
  }
};

// Create a new product category
export const createProductCategory = async (req, res) => {
  const { name, description, image, slug, order_index } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO product_categories (name, description, image, slug, order_index) VALUES (?, ?, ?, ?, ?)',
      [name, description, image, slug, order_index]
    );

    const [newCategory] = await pool.query('SELECT * FROM product_categories WHERE id = ?', [result.insertId]);
    res.status(201).json(newCategory[0]);
  } catch (error) {
    console.error('Error creating product category:', error);
    res.status(500).json({ message: 'Error creating product category' });
  }
};

// Update a product category
export const updateProductCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, slug, order_index } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE product_categories SET name = ?, description = ?, image = ?, slug = ?, order_index = ? WHERE id = ?',
      [name, description, image, slug, order_index, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product category not found' });
    }

    const [updatedCategory] = await pool.query('SELECT * FROM product_categories WHERE id = ?', [id]);
    res.json(updatedCategory[0]);
  } catch (error) {
    console.error('Error updating product category:', error);
    res.status(500).json({ message: 'Error updating product category' });
  }
};

// Delete a product category
export const deleteProductCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // First, delete all products in this category
    await pool.query('DELETE FROM products WHERE category_id = ?', [id]);
    
    // Then delete the category
    const [result] = await pool.query('DELETE FROM product_categories WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product category not found' });
    }

    res.json({ message: 'Product category and associated products deleted successfully' });
  } catch (error) {
    console.error('Error deleting product category:', error);
    res.status(500).json({ message: 'Error deleting product category' });
  }
};