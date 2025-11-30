# Frontend - Next.js App

Modern React application built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
app/                  # Next.js App Router pages
├── page.tsx         # Home page
├── about/
├── blog/
│   ├── page.tsx     # Blog list
│   └── [id]/        # Blog detail
├── portfolio/
├── fitness/
├── dance-music/
├── contact/
├── login/
├── signup/
└── manage/          # Protected routes
    └── blogs/

components/          # Reusable UI components
├── Button.tsx
├── Input.tsx
├── Card.tsx
├── MarkdownEditor.tsx
└── ...

context/             # React Context
└── AuthContext.tsx  # Authentication state

services/            # API service functions
├── auth.service.ts
├── user.service.ts
├── blog.service.ts
└── storage.service.ts

hooks/               # Custom React hooks
├── useApi.ts        # SWR wrapper
└── useImageCompression.ts

lib/                 # Utilities
└── api.ts           # Axios instance

types/               # TypeScript types
└── index.ts
```

## 🎨 Styling

Uses Tailwind CSS with custom theme configuration. Global styles in `styles/globals.css`.

### Components
- `Button` - Primary, secondary, outline variants
- `Input` - Form input with validation
- `Textarea` - Textarea with validation
- `Card` - Card container
- `MarkdownEditor` - Markdown editor with preview
- `MarkdownRenderer` - Markdown renderer with syntax highlighting
- `ImageUpload` - Image upload with compression
- `LoadingSpinner` - Loading indicator

## 🔐 Authentication

Uses Context API for global auth state. Protected routes use `ProtectedRoute` component.

### Auth Context
- `useAuth()` hook provides:
  - `user` - Current user
  - `loading` - Loading state
  - `login()` - Login function
  - `signup()` - Signup function
  - `logout()` - Logout function

## 📡 API Integration

Uses SWR for data fetching and Axios for HTTP requests. API client configured with interceptors for token refresh.

### Services
- `authService` - Authentication API calls
- `userService` - User profile API calls
- `blogService` - Blog CRUD API calls
- `blogCategoryService` - Category API calls
- `storageService` - Image compression

## 🖼️ Image Handling

Client-side image compression using `browser-image-compression` before upload. Images are compressed to reduce file size while maintaining quality.

## 📱 Responsive Design

Mobile-first approach with Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🚀 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_API_URL` - Backend API URL

### Next.js Config
- Image optimization configured
- API rewrites for backend proxy

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SWR Documentation](https://swr.vercel.app)

