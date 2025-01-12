# Clean up existing build artifacts
Write-Host "Cleaning up..."
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue

# Install dependencies globally
Write-Host "Installing global dependencies..."
npm install -g typescript
npm install -g vite

# Install project dependencies
Write-Host "Installing project dependencies..."
npm install

# Build the project
Write-Host "Building the project..."
npm run build

# Create .user.ini in dist folder
Write-Host "Creating configuration files..."
@"
open_basedir="E:\Inetpub\vhosts\triome.com.sa\dist\;C:\Windows\Temp\"
error_reporting=22519
error_log="E:\Inetpub\vhosts\triome.com.sa\logs\php_errors\triome.com.sa\php_error.log"
"@ | Out-File -FilePath "dist\.user.ini" -Encoding UTF8

# Copy configuration files
if (Test-Path ".htaccess") {
    Copy-Item ".htaccess" -Destination "dist\"
}

if (Test-Path "web.config") {
    Copy-Item "web.config" -Destination "dist\"
}

# Create production environment file in dist
@"
NODE_ENV=production
PORT=3000
VITE_API_URL=https://triome.com.sa
DB_HOST=localhost
DB_USER=triomeco_enjaz
DB_PASSWORD=Trio_2025@
DB_NAME=triomeco_enjaz
DB_PORT=3306
"@ | Out-File -FilePath "dist\.env" -Encoding UTF8

# Create a robots.txt in dist
@"
User-agent: *
Allow: /
Sitemap: https://triome.com.sa/sitemap.xml
"@ | Out-File -FilePath "dist\robots.txt" -Encoding UTF8

# Set proper permissions for IIS
Write-Host "Setting file permissions..."
$acl = Get-Acl "dist"
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule("IIS_IUSRS", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl.SetAccessRule($rule)
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule("NETWORK SERVICE", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl.SetAccessRule($rule)
Set-Acl "dist" $acl

# Clean up development files from dist
Write-Host "Cleaning up development files..."
Remove-Item -Path "dist\.git" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "dist\node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "dist\.gitignore" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "dist\package-lock.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "dist\deploy.ps1" -Force -ErrorAction SilentlyContinue

# Verify dist structure
Write-Host "Verifying deployment..."
Get-ChildItem -Path "dist" -Force

Write-Host "Deployment completed successfully!" 