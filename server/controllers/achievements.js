import { pool } from '../db.js';

// Get all achievements
export const getAchievements = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM achievements ORDER BY order_index ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ message: 'Error fetching achievements' });
  }
};

// Create a new achievement
export const createAchievement = async (req, res) => {
  const { title, description, image, date, order_index } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO achievements (title, description, image, date, order_index) VALUES (?, ?, ?, ?, ?)',
      [title, description, image, date, order_index]
    );

    const [newAchievement] = await pool.query('SELECT * FROM achievements WHERE id = ?', [result.insertId]);
    res.status(201).json(newAchievement[0]);
  } catch (error) {
    console.error('Error creating achievement:', error);
    res.status(500).json({ message: 'Error creating achievement' });
  }
};

// Update an achievement
export const updateAchievement = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, date, order_index } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE achievements SET title = ?, description = ?, image = ?, date = ?, order_index = ? WHERE id = ?',
      [title, description, image, date, order_index, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    const [updatedAchievement] = await pool.query('SELECT * FROM achievements WHERE id = ?', [id]);
    res.json(updatedAchievement[0]);
  } catch (error) {
    console.error('Error updating achievement:', error);
    res.status(500).json({ message: 'Error updating achievement' });
  }
};

// Delete an achievement
export const deleteAchievement = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM achievements WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    res.status(500).json({ message: 'Error deleting achievement' });
  }
};