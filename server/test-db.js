import pool from './config/db.js';

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database!');
    
    // Test database charset and collation
    const [rows] = await connection.query('SHOW VARIABLES LIKE "character_set_database"');
    console.log('Database character set:', rows[0].Value);
    
    connection.release();
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    process.exit();
  }
}

testConnection(); 