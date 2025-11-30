#!/bin/bash

# Environment check script

echo "🔍 Checking environment setup..."

ERRORS=0

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    ERRORS=$((ERRORS + 1))
else
    NODE_VERSION=$(node -v)
    echo "✅ Node.js: $NODE_VERSION"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    ERRORS=$((ERRORS + 1))
else
    NPM_VERSION=$(npm -v)
    echo "✅ npm: $NPM_VERSION"
fi

# Check backend .env
if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found (copy from .env.example)"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ backend/.env exists"
fi

# Check frontend .env.local
if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️  frontend/.env.local not found"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ frontend/.env.local exists"
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "⚠️  Root dependencies not installed"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ Root dependencies installed"
fi

if [ ! -d "backend/node_modules" ]; then
    echo "⚠️  Backend dependencies not installed"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ Backend dependencies installed"
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "⚠️  Frontend dependencies not installed"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ Frontend dependencies installed"
fi

# Check if database exists
if [ ! -f "backend/dev.db" ] && [ ! -f "backend/prisma/dev.db" ]; then
    echo "⚠️  Database not initialized (run: npm run prisma:migrate)"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ Database exists"
fi

echo ""
if [ $ERRORS -eq 0 ]; then
    echo "✅ All checks passed! Ready to run."
else
    echo "❌ Found $ERRORS issue(s). Please fix them before running."
    echo ""
    echo "Run: npm run setup"
fi

