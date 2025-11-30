#!/bin/bash

# Setup script for Personal Brand Website
# This script sets up the development environment

set -e  # Exit on error

echo "🔧 Setting up Personal Brand Website..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js is not installed. Please install Node.js 18.20 or higher.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
echo -e "${BLUE}Node.js version: $NODE_VERSION${NC}"

# Install root dependencies
echo -e "${BLUE}Installing root dependencies...${NC}"
npm install

# Setup backend
echo -e "${BLUE}Setting up backend...${NC}"
cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${YELLOW}Please edit backend/.env with your configuration${NC}"
    else
        echo -e "${YELLOW}.env.example not found. Please create .env manually${NC}"
    fi
fi

npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
echo -e "${GREEN}Backend setup complete!${NC}"
cd ..

# Setup frontend
echo -e "${BLUE}Setting up frontend...${NC}"
cd frontend

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}Creating .env.local file...${NC}"
    echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
fi

npm install
echo -e "${GREEN}Frontend setup complete!${NC}"
cd ..

echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo -e "${BLUE}To start development:${NC}"
echo "  npm run dev          # Start both backend and frontend"
echo "  npm run dev:backend  # Start only backend"
echo "  npm run dev:frontend # Start only frontend"

