# Personal Brand Website - Full Stack

A complete, production-ready full-stack personal branding platform built with Next.js and NestJS.

## 🚀 Quick Start

```bash
# Setup everything
npm run setup

# Start development servers
npm run dev
```

Visit http://localhost:3000

See [QUICK_START.md](QUICK_START.md) for detailed quick start guide.
See [MANUAL_SETUP.md](MANUAL_SETUP.md) for complete manual setup instructions.
See [FREE_SERVICES_GUIDE.md](FREE_SERVICES_GUIDE.md) for information about free services and pricing.

## 🚀 Features

- **Modern UI**: Professional, responsive design with Tailwind CSS
- **Authentication**: Complete JWT-based auth with refresh tokens
- **Blog Platform**: Full CRUD blog system with Markdown support
- **Media Management**: Image/video uploads with compression
- **User Profiles**: Public user profiles with social links
- **Showcase Pages**: Fitness, Dance & Music showcase sections
- **Portfolio**: Project showcase with tech stack
- **Contact**: Contact form with social links
- **SEO Optimized**: Dynamic metadata and OG tags

## 📁 Project Structure

```
PersonalBrandingWebsite/
├── backend/          # NestJS backend
│   ├── src/
│   │   ├── auth/     # Authentication module
│   │   ├── user/     # User management
│   │   ├── blog/     # Blog CRUD
│   │   ├── blog-category/
│   │   ├── common/   # Shared utilities
│   │   └── ...
│   └── prisma/       # Database schema & migrations
│
└── frontend/         # Next.js frontend
    ├── app/          # App Router pages
    ├── components/   # Reusable components
    ├── context/     # React Context (Auth)
    ├── services/    # API services
    ├── hooks/       # Custom hooks
    └── ...
```

## 🛠️ Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **SQLite** - Database (easily migratable to PostgreSQL/MySQL)
- **JWT** - Authentication
- **Sharp** - Image processing
- **Multer** - File uploads
- **Nodemailer** - Email service

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **SWR** - Data fetching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Markdown** - Markdown rendering

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start development server
npm run start:dev
```

Backend will run on `http://localhost:3001`

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🔐 Default Credentials

After seeding:
- **Email**: admin@example.com
- **Password**: Admin@123

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
PORT=3001
FRONTEND_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🗄️ Database Schema

- **User**: User accounts with profiles
- **Blog**: Blog posts with markdown content
- **BlogCategory**: Blog categories
- **BlogMedia**: Media files for blogs
- **RefreshToken**: JWT refresh tokens
- **PasswordResetToken**: Password reset tokens

## 🔄 API Endpoints

### Authentication
- `POST /auth/signup` - Create account
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/refresh` - Refresh tokens
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password
- `GET /auth/me` - Get current user

### Users
- `GET /user/:id` - Get user profile
- `PATCH /user/:id` - Update profile
- `POST /user/avatar` - Upload avatar

### Blogs
- `GET /blog` - List public blogs (paginated)
- `GET /blog/:id` - Get blog by ID
- `GET /blog/my-blogs` - Get user's blogs
- `POST /blog` - Create blog
- `PATCH /blog/:id` - Update blog
- `DELETE /blog/:id` - Delete blog
- `POST /blog/:id/media` - Upload media
- `POST /blog/:id/thumbnail` - Upload thumbnail

### Categories
- `GET /blog-category` - List all categories

## 🎨 Pages

- `/` - Home page with hero section
- `/about` - About page
- `/portfolio` - Portfolio showcase
- `/blog` - Blog list with search & filters
- `/blog/[id]` - Blog detail page
- `/fitness` - Fitness showcase
- `/dance-music` - Dance & Music showcase
- `/profile/[id]` - User profile
- `/contact` - Contact form
- `/login` - Login page
- `/signup` - Signup page
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset
- `/manage/blogs` - Blog management (protected)

## 🚀 Deployment

### Backend
1. Set environment variables
2. Run migrations: `npm run prisma:migrate`
3. Build: `npm run build`
4. Start: `npm run start:prod`

### Frontend
1. Set `NEXT_PUBLIC_API_URL` to your backend URL
2. Build: `npm run build`
3. Start: `npm run start`

## 📚 Documentation

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [Storage Migration Guide](backend/docs/STORAGE_MIGRATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License

