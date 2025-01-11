import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importProducts() {
  try {
    // Read the products JSON file
    const productsData = fs.readFileSync(
      path.join(__dirname, '../../src/data/products.json'),
      'utf8'
    );
    const products = JSON.parse(productsData);

    // Insert each product into the database
    for (const product of products) {
      await pool.query(
        'INSERT INTO products (id, category_id, name, description, image) VALUES (?, ?, ?, ?, ?)',
        [product.id, product.category, product.name, product.description, product.image]
      );
      console.log(`Imported product: ${product.name}`);
    }

    console.log('All products imported successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error importing products:', error);
    process.exit(1);
  }
}

importProducts(); 