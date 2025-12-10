export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  socialLinks?: Record<string, string>;
  role: string;
  createdAt?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  authorId: string;
  isPublic: boolean;
  status?: string; // "draft" | "published"
  thumbnailUrl?: string;
  thumbnailSource?: string; // "upload" | "external"
  categoryId?: string;
  tags?: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author?: User;
  category?: BlogCategory;
  media?: BlogMedia[];
}

export interface BlogCategory {
  id: string;
  name: string;
  createdAt?: string;
}

export interface BlogMedia {
  id: string;
  blogId: string;
  url: string;
  type: 'image' | 'video';
  createdAt?: string;
}

export interface PaginatedResponse<T> {
  blogs: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
  refreshToken?: string;
}

