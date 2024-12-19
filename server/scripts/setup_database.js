import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  try {
    // Read the SQL file
    const sqlFile = path.join(__dirname, 'create_tables.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    // Split the SQL file into individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim());

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
        console.log('Executed:', statement.trim().split('\n')[0] + '...');
      }
    }

    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase(); 