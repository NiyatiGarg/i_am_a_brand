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
  content: string;
  authorId: string;
  isPublic: boolean;
  thumbnailUrl?: string;
  categoryId?: string;
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

