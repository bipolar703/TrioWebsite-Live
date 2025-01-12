#!/bin/bash

# Clean up existing build artifacts
echo "Cleaning up..."
rm -rf dist
rm -rf node_modules
rm -f package-lock.json

# Install dependencies globally
echo "Installing global dependencies..."
npm install -g typescript
npm install -g vite

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Create .user.ini in dist folder
echo "Creating configuration files..."
cat > dist/.user.ini << EOL
open_basedir="E:\Inetpub\vhosts\triome.com.sa\dist\;C:\Windows\Temp\"
error_reporting=22519
error_log="E:\Inetpub\vhosts\triome.com.sa\logs\php_errors\triome.com.sa\php_error.log"
EOL

# Copy configuration files
if [ -f ".htaccess" ]; then
    cp .htaccess dist/
fi

if [ -f "web.config" ]; then
    cp web.config dist/
fi

# Create production environment file in dist
cat > dist/.env << EOL
NODE_ENV=production
PORT=3000
VITE_API_URL=https://triome.com.sa
DB_HOST=localhost
DB_USER=triomeco_enjaz
DB_PASSWORD=Trio_2025@
DB_NAME=triomeco_enjaz
DB_PORT=3306
EOL

# Create a robots.txt in dist
cat > dist/robots.txt << EOL
User-agent: *
Allow: /
Sitemap: https://triome.com.sa/sitemap.xml
EOL

# Set proper permissions for IIS
echo "Setting file permissions..."
icacls "dist" /grant "IIS_IUSRS:(OI)(CI)F" /T
icacls "dist" /grant "NETWORK SERVICE:(OI)(CI)F" /T

# Clean up development files from dist
echo "Cleaning up development files..."
rm -rf dist/.git
rm -rf dist/node_modules
rm -f dist/.gitignore
rm -f dist/package-lock.json
rm -f dist/deploy.sh

# Verify dist structure
echo "Verifying deployment..."
ls -la dist/

echo "Deployment completed successfully!" 