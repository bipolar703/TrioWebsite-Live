import { pool } from '../db.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY order_index ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get a single product
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const { category_id, name, description, features, specifications, image, slug, order_index } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO products (category_id, name, description, features, specifications, image, slug, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [category_id, name, description, features, specifications, image, slug, order_index]
    );

    const [newProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
    res.status(201).json(newProduct[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { category_id, name, description, features, specifications, image, slug, order_index } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE products SET category_id = ?, name = ?, description = ?, features = ?, specifications = ?, image = ?, slug = ?, order_index = ? WHERE id = ?',
      [category_id, name, description, features, specifications, image, slug, order_index, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const [updatedProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    res.json(updatedProduct[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};