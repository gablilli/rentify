#!/bin/bash

echo "🚀 Installing Rentify Self-Hosted..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

# Create data directories
echo "📁 Creating data directories..."
mkdir -p data/uploads data/contracts data/receipts data/backups
mkdir -p config templates/email

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "⚙️ Creating environment configuration..."
    cat > .env.local << EOL
# Database
DATABASE_PATH=./data/rental.db

# File Storage
UPLOADS_PATH=./data/uploads
CONTRACTS_PATH=./data/contracts
RECEIPTS_PATH=./data/receipts

# JWT Secret (change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# SMTP Configuration
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@rentify.local

# Application
APP_URL=http://localhost:3000
NODE_ENV=production

# Admin User
ADMIN_EMAIL=admin@rentify.local
ADMIN_PASSWORD=admin123
EOL
    echo "✅ Environment file created: .env.local"
fi

# Run setup
echo "🔧 Running initial setup..."
npm run setup

echo ""
echo "🎉 Installation completed!"
echo ""
echo "📋 To start the application:"
echo "   npm start"
echo ""
echo "🌐 Then open: http://localhost:3000"
echo ""
echo "🔐 Default admin credentials:"
echo "   Email: admin@rentify.local"
echo "   Password: admin123"
echo ""
echo "⚠️  Remember to:"
echo "   1. Change the default admin password"
echo "   2. Update JWT_SECRET in .env.local"
echo "   3. Configure SMTP settings for email notifications"
echo ""
