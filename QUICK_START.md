# Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18.20.0 or higher
- npm 9.0.0 or higher

## Installation

### Option 1: Using Setup Script (Recommended)

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run setup script
./scripts/setup.sh
```

### Option 2: Manual Setup

```bash
# Install all dependencies
npm run install:all

# Setup backend
cd backend
cp .env.example .env
# Edit .env with your configuration
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
cd ..

# Setup frontend
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
cd ..
```

## Running the Application

### Development Mode

**Run both together:**
```bash
npm run dev
```

**Run separately:**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### Production Mode

```bash
# Build both
npm run build

# Start both
npm run start
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## Default Credentials

After seeding:
- **Email**: admin@example.com
- **Password**: Admin@123

## Next Steps

1. **Configure Email Service** (for password reset):
   - See `MANUAL_SETUP.md` → Email Service Configuration
   - Update `backend/.env` with SMTP credentials

2. **Configure Cloud Storage** (optional):
   - See `MANUAL_SETUP.md` → Cloud Storage Setup
   - See `backend/docs/STORAGE_MIGRATION.md`

3. **Deploy to Production**:
   - See `MANUAL_SETUP.md` → Production Deployment

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Database Issues
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

### Module Not Found
```bash
# Reinstall dependencies
npm run install:all
```

## Scripts Reference

### Root Level
- `npm run dev` - Start both backend and frontend in dev mode
- `npm run build` - Build both for production
- `npm run start` - Start both in production mode
- `npm run setup` - Complete setup (install + migrate + seed)

### Backend Only
- `cd backend && npm run start:dev` - Development server
- `cd backend && npm run build` - Build for production
- `cd backend && npm run start:prod` - Production server
- `cd backend && npm run prisma:studio` - Open Prisma Studio

### Frontend Only
- `cd frontend && npm run dev` - Development server
- `cd frontend && npm run build` - Build for production
- `cd frontend && npm run start` - Production server

## Need Help?

Check `MANUAL_SETUP.md` for detailed instructions on:
- Email configuration
- Cloud storage setup
- Production deployment
- Domain configuration
- SSL setup

