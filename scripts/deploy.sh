#!/bin/bash

# Deployment script for Personal Brand Website
# This script builds and prepares the application for deployment

set -e  # Exit on error

echo "🚀 Starting deployment process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js version is correct
echo -e "${BLUE}Checking Node.js version...${NC}"
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1,2)
REQUIRED_VERSION="18.20"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo -e "${RED}Error: Node.js version 18.20 or higher is required. Current version: $NODE_VERSION${NC}"
    exit 1
fi

# Backend deployment
echo -e "${BLUE}Building backend...${NC}"
cd backend
npm install
npm run build
npm run prisma:generate
echo -e "${GREEN}Backend built successfully!${NC}"
cd ..

# Frontend deployment
echo -e "${BLUE}Building frontend...${NC}"
cd frontend
npm install
npm run build
echo -e "${GREEN}Frontend built successfully!${NC}"
cd ..

echo -e "${GREEN}✅ Deployment build completed successfully!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Set up environment variables on your server"
echo "2. Run database migrations: cd backend && npm run prisma:migrate:prod"
echo "3. Start the backend: cd backend && npm run start:prod"
echo "4. Start the frontend: cd frontend && npm run start"

