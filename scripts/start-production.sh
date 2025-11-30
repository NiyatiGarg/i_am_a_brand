#!/bin/bash

# Production start script

set -e

echo "🚀 Starting production servers..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

# Build if not already built
if [ ! -d "backend/dist" ]; then
    echo "Building backend..."
    cd backend
    npm run build
    cd ..
fi

if [ ! -d "frontend/.next" ]; then
    echo "Building frontend..."
    cd frontend
    npm run build
    cd ..
fi

# Start with PM2
echo "Starting with PM2..."
pm2 start ecosystem.config.js

echo "✅ Servers started!"
echo "View status: pm2 status"
echo "View logs: pm2 logs"

