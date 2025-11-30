# Manual Setup Guide

This guide provides step-by-step instructions for all manual tasks required to set up and deploy the Personal Brand Website.

## Table of Contents

1. [Initial Development Setup](#initial-development-setup)
2. [Email Service Configuration](#email-service-configuration)
3. [Cloud Storage Setup (Optional)](#cloud-storage-setup-optional)
4. [Production Deployment](#production-deployment)
5. [Domain Configuration](#domain-configuration)
6. [SSL Certificate Setup](#ssl-certificate-setup)

---

## Initial Development Setup

### Step 1: Install Node.js

1. **Check if Node.js is installed:**
   ```bash
   node -v
   ```
   Should show version 18.20.0 or higher

2. **If not installed, install Node.js:**
   - Visit: https://nodejs.org/
   - Download LTS version (18.x or higher)
   - Install following the installer instructions
   - Verify installation: `node -v` and `npm -v`

### Step 2: Install NVM (Node Version Manager) - Recommended

1. **For macOS/Linux:**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. **For Windows:**
   - Download from: https://github.com/coreybutler/nvm-windows/releases
   - Install the installer

3. **Use NVM to install Node.js:**
   ```bash
   nvm install 18.20.0
   nvm use 18.20.0
   ```

### Step 3: Clone Repository

1. **If using Git:**
   ```bash
   git clone <repository-url>
   cd PersonalBrandingWebsite
   ```

2. **Or extract the project folder if provided as ZIP**

### Step 4: Run Setup Script

```bash
# Make scripts executable (if needed)
chmod +x scripts/*.sh

# Run setup script
./scripts/setup.sh

# Or manually:
npm run setup
```

### Step 5: Configure Backend Environment

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` file with your values:**
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # JWT Secrets (IMPORTANT: Generate strong random strings)
   JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   JWT_EXPIRES_IN="15m"
   JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"
   JWT_REFRESH_EXPIRES_IN="7d"
   
   # Server
   PORT=3001
   NODE_ENV=development
   
   # Frontend URL
   FRONTEND_URL="http://localhost:3000"
   
   # Email Configuration (see Email Service Configuration section)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   EMAIL_FROM=noreply@personalbrand.com
   
   # Storage
   STORAGE_TYPE=local
   STORAGE_PATH=./uploads
   ```

4. **Generate JWT Secrets:**
   ```bash
   # Option 1: Using Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Option 2: Using OpenSSL
   openssl rand -hex 32
   ```
   Copy the output and use it for `JWT_SECRET` and `JWT_REFRESH_SECRET`

### Step 6: Configure Frontend Environment

1. **Navigate to frontend folder:**
   ```bash
   cd ../frontend
   ```

2. **Create `.env.local` file:**
   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
   ```

3. **For production, update with your backend URL:**
   ```env
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   ```

### Step 7: Start Development Servers

**Option A: Run both together:**
```bash
# From root directory
npm run dev
```

**Option B: Run separately:**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

---

## Email Service Configuration

### Option 1: Gmail (Recommended for Development)

1. **Go to your Google Account:**
   - Visit: https://myaccount.google.com/
   - Navigate to Security

2. **Enable 2-Step Verification:**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification if not already enabled

3. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter name: "Personal Brand Website"
   - Click "Generate"
   - **Copy the 16-character password** (you won't see it again)

4. **Update backend/.env:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=<paste-the-16-character-app-password>
   EMAIL_FROM=your-email@gmail.com
   ```

### Option 2: SendGrid (Recommended for Production)

1. **Create SendGrid Account:**
   - Visit: https://sendgrid.com/
   - Click "Start for Free"
   - Sign up with your email
   - Verify your email address

2. **Create API Key:**
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name: "Personal Brand Website"
   - Select "Full Access" or "Restricted Access" (Mail Send)
   - Click "Create & View"
   - **Copy the API key** (you won't see it again)

3. **Verify Sender:**
   - Go to Settings → Sender Authentication
   - Click "Verify a Single Sender"
   - Fill in your details
   - Verify via email

4. **Update backend/.env:**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=<paste-your-sendgrid-api-key>
   EMAIL_FROM=your-verified-email@domain.com
   ```

### Option 3: Mailgun

1. **Create Mailgun Account:**
   - Visit: https://www.mailgun.com/
   - Sign up for free account
   - Verify your email

2. **Get SMTP Credentials:**
   - Go to Sending → Domain Settings
   - Copy SMTP credentials

3. **Update backend/.env:**
   ```env
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_USER=<your-mailgun-username>
   SMTP_PASS=<your-mailgun-password>
   EMAIL_FROM=noreply@your-domain.com
   ```

---

## Cloud Storage Setup (Optional)

### Option 1: Cloudinary

1. **Create Cloudinary Account:**
   - Visit: https://cloudinary.com/
   - Click "Sign Up for Free"
   - Sign up with email or social account
   - Verify your email

2. **Get API Credentials:**
   - Go to Dashboard
   - Copy the following:
     - Cloud Name
     - API Key
     - API Secret

3. **Update backend/.env:**
   ```env
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Follow migration guide:**
   - See: `backend/docs/STORAGE_MIGRATION.md`
   - Update `backend/src/common/storage/storage.module.ts` to use CloudinaryStorageService

### Option 2: AWS S3

1. **Create AWS Account:**
   - Visit: https://aws.amazon.com/
   - Sign up for account
   - Complete verification

2. **Create S3 Bucket:**
   - Go to S3 Console
   - Click "Create bucket"
   - Name: `personal-brand-uploads`
   - Region: Choose closest to you
   - Uncheck "Block all public access" (if you want public URLs)
   - Click "Create bucket"

3. **Create IAM User:**
   - Go to IAM Console → Users
   - Click "Add users"
   - Username: `personal-brand-s3-user`
   - Select "Programmatic access"
   - Attach policy: `AmazonS3FullAccess` (or create custom policy)
   - Click "Create user"
   - **Save Access Key ID and Secret Access Key**

4. **Update backend/.env:**
   ```env
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=<your-access-key-id>
   AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
   AWS_S3_BUCKET=personal-brand-uploads
   ```

5. **Follow migration guide:**
   - See: `backend/docs/STORAGE_MIGRATION.md`
   - Update `backend/src/common/storage/storage.module.ts` to use S3StorageService

---

## Production Deployment

### Option 1: VPS Deployment (DigitalOcean, AWS EC2, etc.)

#### Step 1: Set Up Server

1. **Create VPS Instance:**
   - DigitalOcean: https://www.digitalocean.com/
   - AWS EC2: https://aws.amazon.com/ec2/
   - Linode: https://www.linode.com/
   - Choose Ubuntu 22.04 LTS
   - Minimum: 1GB RAM, 1 CPU

2. **SSH into Server:**
   ```bash
   ssh root@your-server-ip
   ```

3. **Update System:**
   ```bash
   apt update && apt upgrade -y
   ```

4. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt install -y nodejs
   node -v  # Should show v18.x.x
   ```

5. **Install PM2 (Process Manager):**
   ```bash
   npm install -g pm2
   ```

6. **Install Nginx:**
   ```bash
   apt install -y nginx
   ```

7. **Install PostgreSQL (or use SQLite for small deployments):**
   ```bash
   apt install -y postgresql postgresql-contrib
   ```

#### Step 2: Deploy Application

1. **Clone Repository:**
   ```bash
   cd /var/www
   git clone <your-repo-url> personal-brand-website
   cd personal-brand-website
   ```

2. **Install Dependencies:**
   ```bash
   npm run install:all
   ```

3. **Configure Backend:**
   ```bash
   cd backend
   cp .env.example .env
   nano .env  # Edit with production values
   ```

4. **Update Database URL for Production:**
   ```env
   # For PostgreSQL
   DATABASE_URL="postgresql://user:password@localhost:5432/personalbrand?schema=public"
   
   # Or keep SQLite for small deployments
   DATABASE_URL="file:./prod.db"
   ```

5. **Run Migrations:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate:prod
   npm run prisma:seed
   ```

6. **Build Backend:**
   ```bash
   npm run build
   ```

7. **Start Backend with PM2:**
   ```bash
   pm2 start dist/main.js --name "personal-brand-backend"
   pm2 save
   pm2 startup  # Follow instructions to enable auto-start
   ```

8. **Configure Frontend:**
   ```bash
   cd ../frontend
   echo "NEXT_PUBLIC_API_URL=https://api.yourdomain.com" > .env.local
   npm run build
   ```

9. **Start Frontend with PM2:**
   ```bash
   pm2 start npm --name "personal-brand-frontend" -- start
   pm2 save
   ```

#### Step 3: Configure Nginx

1. **Create Nginx Config:**
   ```bash
   nano /etc/nginx/sites-available/personal-brand
   ```

2. **Add Configuration:**
   ```nginx
   # Frontend
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   
   # Backend API
   server {
       listen 80;
       server_name api.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable Site:**
   ```bash
   ln -s /etc/nginx/sites-available/personal-brand /etc/nginx/sites-enabled/
   nginx -t  # Test configuration
   systemctl restart nginx
   ```

### Option 2: Vercel (Frontend) + Railway/Render (Backend)

#### Frontend on Vercel:

1. **Create Vercel Account:**
   - Visit: https://vercel.com/
   - Sign up with GitHub

2. **Import Project:**
   - Click "New Project"
   - Import your repository
   - Root Directory: `frontend`
   - Framework Preset: Next.js
   - Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.com
     ```

3. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

#### Backend on Railway:

1. **Create Railway Account:**
   - Visit: https://railway.app/
   - Sign up with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Root Directory: `backend`

3. **Configure Environment Variables:**
   - Go to Variables tab
   - Add all variables from `.env.example`

4. **Set Up Database:**
   - Click "New" → "Database" → "PostgreSQL"
   - Copy DATABASE_URL
   - Update DATABASE_URL in Variables

5. **Deploy:**
   - Railway will auto-deploy
   - Copy the generated URL
   - Update frontend `NEXT_PUBLIC_API_URL`

---

## Domain Configuration

### Step 1: Purchase Domain

1. **Choose Domain Registrar:**
   - Namecheap: https://www.namecheap.com/
   - GoDaddy: https://www.godaddy.com/
   - Google Domains: https://domains.google/

2. **Purchase Domain:**
   - Search for your desired domain
   - Complete purchase
   - Verify ownership

### Step 2: Configure DNS Records

1. **Access DNS Settings:**
   - Go to your domain registrar's dashboard
   - Navigate to DNS Management

2. **Add A Record (Frontend):**
   ```
   Type: A
   Name: @
   Value: <your-server-ip>
   TTL: 3600
   ```

3. **Add A Record (API Subdomain):**
   ```
   Type: A
   Name: api
   Value: <your-server-ip>
   TTL: 3600
   ```

4. **Add CNAME Record (WWW):**
   ```
   Type: CNAME
   Name: www
   Value: yourdomain.com
   TTL: 3600
   ```

5. **Wait for Propagation:**
   - DNS changes can take 24-48 hours
   - Check with: `nslookup yourdomain.com`

---

## SSL Certificate Setup

### Using Let's Encrypt (Free)

1. **Install Certbot:**
   ```bash
   apt install -y certbot python3-certbot-nginx
   ```

2. **Obtain Certificate:**
   ```bash
   certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
   ```

3. **Follow Prompts:**
   - Enter email address
   - Agree to terms
   - Choose redirect HTTP to HTTPS

4. **Auto-Renewal:**
   ```bash
   certbot renew --dry-run  # Test renewal
   ```
   Certbot sets up auto-renewal automatically

5. **Update Nginx Config:**
   Certbot automatically updates your Nginx config with SSL settings

6. **Update Frontend .env.local:**
   ```env
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   ```

7. **Update Backend .env:**
   ```env
   FRONTEND_URL=https://yourdomain.com
   ```

---

## Post-Deployment Checklist

- [ ] Backend is running on port 3001
- [ ] Frontend is running on port 3000
- [ ] Database migrations completed
- [ ] Environment variables configured
- [ ] Email service tested (send test email)
- [ ] SSL certificate installed
- [ ] Domain pointing to server
- [ ] CORS configured correctly
- [ ] File uploads working
- [ ] Authentication working
- [ ] Blog CRUD operations working
- [ ] Images loading correctly
- [ ] All pages accessible

---

## Troubleshooting

### Backend won't start:
- Check if port 3001 is available: `lsof -i :3001`
- Check environment variables: `cat backend/.env`
- Check logs: `pm2 logs personal-brand-backend`

### Frontend won't start:
- Check if port 3000 is available: `lsof -i :3000`
- Check environment variables: `cat frontend/.env.local`
- Check logs: `pm2 logs personal-brand-frontend`

### Database errors:
- Check DATABASE_URL format
- Ensure database exists
- Run migrations: `npm run prisma:migrate`

### Email not sending:
- Verify SMTP credentials
- Check firewall allows port 587
- Test SMTP connection
- Check spam folder

### Images not uploading:
- Check storage path exists
- Verify write permissions
- Check file size limits
- Review storage service logs

---

## Support

For issues or questions:
1. Check logs: `pm2 logs`
2. Review error messages
3. Check environment variables
4. Verify all services are running
5. Review this manual setup guide

