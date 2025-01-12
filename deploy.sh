#!/bin/bash

# Install dependencies
npm install

# Build the project
npm run build

# Create .user.ini in dist folder
cat > dist/.user.ini << EOL
open_basedir="E:\Inetpub\vhosts\triome.com.sa\dist\;C:\Windows\Temp\"
error_reporting=22519
error_log="E:\Inetpub\vhosts\triome.com.sa\logs\php_errors\triome.com.sa\php_error.log"
EOL

# Copy .htaccess to dist folder if it exists
if [ -f ".htaccess" ]; then
    cp .htaccess dist/
fi

# Copy web.config to dist folder if it exists
if [ -f "web.config" ]; then
    cp web.config dist/
fi

# Create a robots.txt in dist
cat > dist/robots.txt << EOL
User-agent: *
Allow: /
Sitemap: https://triome.com.sa/sitemap.xml
EOL

# Set proper permissions
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;

# Clear cache if needed
if [ -d "storage/framework/cache" ]; then
    rm -rf storage/framework/cache/*
fi

echo "Deployment completed successfully!" 