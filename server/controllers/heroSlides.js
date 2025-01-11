import pool from '../config/db.js';

export const getHeroSlides = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hero_slides ORDER BY order_index ASC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching hero slides' });
  }
};

export const createHeroSlide = async (req, res) => {
  try {
    const {
      image,
      title,
      subtitle,
      left_button_text,
      left_button_link,
      right_button_text,
      right_button_link,
      order_index = 0
    } = req.body;

    const [result] = await pool.query(
      'INSERT INTO hero_slides (image, title, subtitle, left_button_text, left_button_link, right_button_text, right_button_link, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [image, title, subtitle, left_button_text, left_button_link, right_button_text, right_button_link, order_index]
    );

    const [rows] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating hero slide' });
  }
};

export const updateHeroSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      subtitle,
      left_button_text,
      left_button_link,
      right_button_text,
      right_button_link,
      order_index
    } = req.body;

    await pool.query(
      'UPDATE hero_slides SET image = ?, title = ?, subtitle = ?, left_button_text = ?, left_button_link = ?, right_button_text = ?, right_button_link = ?, order_index = ? WHERE id = ?',
      [image, title, subtitle, left_button_text, left_button_link, right_button_text, right_button_link, order_index, id]
    );

    const [rows] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Hero slide not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating hero slide' });
  }
};

export const deleteHeroSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM hero_slides WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Hero slide not found' });
    }
    res.json({ message: 'Hero slide deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting hero slide' });
  }
};