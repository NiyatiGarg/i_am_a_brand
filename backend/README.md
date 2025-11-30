# Backend - NestJS API

RESTful API built with NestJS, Prisma, and SQLite.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Setup database
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# Start development server
npm run start:dev
```

## 📁 Project Structure

```
src/
├── auth/              # Authentication module
│   ├── dto/          # Data Transfer Objects
│   ├── strategies/   # JWT strategy
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── user/             # User management
├── blog/             # Blog CRUD operations
├── blog-category/    # Blog categories
├── common/           # Shared modules
│   ├── storage/     # Storage abstraction
│   ├── guards/      # Auth guards
│   ├── decorators/  # Custom decorators
│   └── filters/     # Exception filters
├── config/          # Configuration
├── database/        # Prisma service
└── utils/           # Utilities
```

## 🔐 Authentication

Uses JWT with access tokens (15min) and refresh tokens (7 days). Tokens are stored in httpOnly cookies.

### Guards
- `JwtAuthGuard` - Protects routes requiring authentication
- `RolesGuard` - Protects admin routes

### Decorators
- `@Public()` - Marks route as public
- `@Roles('admin')` - Requires specific role
- `@CurrentUser()` - Injects current user

## 📦 Modules

### Auth Module
Handles signup, login, logout, refresh tokens, and password reset.

### User Module
User profile management and avatar uploads.

### Blog Module
Full CRUD for blog posts with markdown support and media uploads.

### Storage Module
Abstracted storage service for easy migration to cloud storage (see [STORAGE_MIGRATION.md](docs/STORAGE_MIGRATION.md)).

## 🗄️ Database

Uses Prisma ORM with SQLite. Schema defined in `prisma/schema.prisma`.

### Migrations
```bash
npm run prisma:migrate
```

### Seed
```bash
npm run prisma:seed
```

### Studio
```bash
npm run prisma:studio
```

## 📝 API Documentation

API endpoints are documented in the main README. All endpoints use DTOs for validation.

## 🔧 Configuration

Environment variables:
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - Refresh token secret
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS
- `SMTP_*` - Email configuration

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Storage Migration Guide](docs/STORAGE_MIGRATION.md)

