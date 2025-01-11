import { pool } from '../db.js';

// Get all client logos
export const getClientLogos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM client_logos ORDER BY order_index ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching client logos:', error);
    res.status(500).json({ message: 'Error fetching client logos' });
  }
};

// Create a new client logo
export const createClientLogo = async (req, res) => {
  const { name, image, url, order_index } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO client_logos (name, image, url, order_index) VALUES (?, ?, ?, ?)',
      [name, image, url, order_index]
    );

    const [newClientLogo] = await pool.query('SELECT * FROM client_logos WHERE id = ?', [result.insertId]);
    res.status(201).json(newClientLogo[0]);
  } catch (error) {
    console.error('Error creating client logo:', error);
    res.status(500).json({ message: 'Error creating client logo' });
  }
};

// Update a client logo
export const updateClientLogo = async (req, res) => {
  const { id } = req.params;
  const { name, image, url, order_index } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE client_logos SET name = ?, image = ?, url = ?, order_index = ? WHERE id = ?',
      [name, image, url, order_index, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client logo not found' });
    }

    const [updatedClientLogo] = await pool.query('SELECT * FROM client_logos WHERE id = ?', [id]);
    res.json(updatedClientLogo[0]);
  } catch (error) {
    console.error('Error updating client logo:', error);
    res.status(500).json({ message: 'Error updating client logo' });
  }
};

// Delete a client logo
export const deleteClientLogo = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM client_logos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client logo not found' });
    }

    res.json({ message: 'Client logo deleted successfully' });
  } catch (error) {
    console.error('Error deleting client logo:', error);
    res.status(500).json({ message: 'Error deleting client logo' });
  }
};