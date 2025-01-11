import pool from '../config/db.js';

export const getSiteSettings = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    const settings = rows.reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching site settings' });
  }
};

export const updateSiteSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    await pool.query(
      'UPDATE site_settings SET setting_value = ? WHERE setting_key = ?',
      [value, key]
    );
    res.json({ message: 'Site setting updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating site setting' });
  }
};