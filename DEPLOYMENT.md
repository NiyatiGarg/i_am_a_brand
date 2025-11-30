# Deployment Guide

Complete guide for deploying the Personal Brand Website to various platforms.

## Table of Contents

1. [VPS Deployment (DigitalOcean/AWS/Linode)](#vps-deployment)
2. [Vercel + Railway](#vercel--railway)
3. [Docker Deployment](#docker-deployment)
4. [PM2 Process Management](#pm2-process-management)

---

## VPS Deployment

### Prerequisites
- VPS with Ubuntu 22.04 LTS
- Domain name (optional but recommended)
- SSH access

### Step-by-Step

1. **Connect to Server**
   ```bash
   ssh root@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt install -y nodejs
   ```

3. **Install PM2**
   ```bash
   npm install -g pm2
   ```

4. **Clone Repository**
   ```bash
   cd /var/www
   git clone <your-repo-url> personal-brand-website
   cd personal-brand-website
   ```

5. **Run Setup**
   ```bash
   npm run setup
   ```

6. **Configure Environment**
   ```bash
   # Backend
   cd backend
   nano .env  # Edit with production values
   
   # Frontend
   cd ../frontend
   nano .env.local  # Edit with production values
   ```

7. **Build and Start**
   ```bash
   # Build
   npm run build
   
   # Start with PM2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

8. **Configure Nginx** (see MANUAL_SETUP.md)

---

## Vercel + Railway

### Frontend on Vercel

1. **Import Project**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Root Directory: `frontend`
   - Framework: Next.js

2. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for completion

### Backend on Railway

1. **Create Project**
   - Go to https://railway.app
   - Click "New Project"
   - Deploy from GitHub repo
   - Root Directory: `backend`

2. **Add Database**
   - Click "New" → "Database" → "PostgreSQL"
   - Copy DATABASE_URL

3. **Environment Variables**
   ```
   DATABASE_URL=<from-database>
   JWT_SECRET=<generate-random-string>
   JWT_REFRESH_SECRET=<generate-random-string>
   FRONTEND_URL=https://your-frontend.vercel.app
   PORT=3001
   NODE_ENV=production
   ```

4. **Deploy**
   - Railway auto-deploys on push
   - Copy the generated URL
   - Update frontend NEXT_PUBLIC_API_URL

---

## Docker Deployment

### Using Docker Compose

1. **Build and Start**
   ```bash
   ./scripts/deploy-docker.sh
   # Or manually:
   docker-compose up -d
   ```

2. **View Logs**
   ```bash
   docker-compose logs -f
   ```

3. **Stop**
   ```bash
   docker-compose down
   ```

### Manual Docker

1. **Build Images**
   ```bash
   docker build -f Dockerfile.backend -t personal-brand-backend .
   docker build -f Dockerfile.frontend -t personal-brand-frontend .
   ```

2. **Run Containers**
   ```bash
   docker run -d -p 3001:3001 --name backend personal-brand-backend
   docker run -d -p 3000:3000 --name frontend personal-brand-frontend
   ```

---

## PM2 Process Management

### Basic Commands

```bash
# Start applications
pm2 start ecosystem.config.js

# View status
pm2 status

# View logs
pm2 logs

# Restart
pm2 restart all

# Stop
pm2 stop all

# Delete
pm2 delete all

# Save current process list
pm2 save

# Setup startup script
pm2 startup
```

### Monitoring

```bash
# Monitor
pm2 monit

# View detailed info
pm2 show personal-brand-backend
pm2 show personal-brand-frontend
```

---

## Environment Variables Checklist

### Backend (.env)
- [ ] DATABASE_URL
- [ ] JWT_SECRET
- [ ] JWT_REFRESH_SECRET
- [ ] PORT
- [ ] NODE_ENV=production
- [ ] FRONTEND_URL
- [ ] SMTP_HOST
- [ ] SMTP_PORT
- [ ] SMTP_USER
- [ ] SMTP_PASS
- [ ] EMAIL_FROM

### Frontend (.env.local)
- [ ] NEXT_PUBLIC_API_URL

---

## Post-Deployment Checklist

- [ ] Backend accessible at configured URL
- [ ] Frontend accessible at configured URL
- [ ] Database migrations completed
- [ ] SSL certificate installed
- [ ] Email service tested
- [ ] File uploads working
- [ ] Authentication working
- [ ] All pages loading correctly
- [ ] Images displaying correctly
- [ ] API endpoints responding

---

## Troubleshooting

### Backend Not Starting
```bash
pm2 logs personal-brand-backend
# Check for errors in logs
```

### Frontend Not Starting
```bash
pm2 logs personal-brand-frontend
# Check for errors in logs
```

### Database Issues
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate:prod
```

### Port Conflicts
```bash
# Check what's using the port
lsof -i :3001
lsof -i :3000

# Kill process
kill -9 <PID>
```

