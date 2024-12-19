-- Add order_index to achievements table
ALTER TABLE achievements
ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

-- Verify and update product_categories table
ALTER TABLE product_categories
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS image VARCHAR(255),
ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Verify and update products table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS features TEXT,
ADD COLUMN IF NOT EXISTS specifications TEXT,
ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_product_categories_slug ON product_categories(slug); 