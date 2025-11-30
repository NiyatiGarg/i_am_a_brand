import api from '@/lib/api';
import { Blog, BlogCategory, PaginatedResponse } from '@/types';

export interface CreateBlogData {
  title: string;
  content: string;
  isPublic?: boolean;
  categoryId?: string;
  thumbnailUrl?: string;
}

export interface UpdateBlogData {
  title?: string;
  content?: string;
  isPublic?: boolean;
  categoryId?: string;
  thumbnailUrl?: string;
}

export interface BlogListParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
}

export const blogService = {
  async getBlogs(params?: BlogListParams): Promise<PaginatedResponse<Blog>> {
    const response = await api.get<PaginatedResponse<Blog>>('/blog', { params });
    return response.data;
  },

  async getBlog(id: string): Promise<Blog> {
    const response = await api.get<Blog>(`/blog/${id}`);
    return response.data;
  },

  async getMyBlogs(): Promise<Blog[]> {
    const response = await api.get<Blog[]>('/blog/my-blogs');
    return response.data;
  },

  async createBlog(data: CreateBlogData): Promise<Blog> {
    const response = await api.post<Blog>('/blog', data);
    return response.data;
  },

  async updateBlog(id: string, data: UpdateBlogData): Promise<Blog> {
    const response = await api.patch<Blog>(`/blog/${id}`, data);
    return response.data;
  },

  async deleteBlog(id: string): Promise<void> {
    await api.delete(`/blog/${id}`);
  },

  async uploadMedia(blogId: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`/blog/${blogId}/media`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async uploadThumbnail(blogId: string, file: File): Promise<Blog> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`/blog/${blogId}/thumbnail`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const blogCategoryService = {
  async getCategories(): Promise<BlogCategory[]> {
    const response = await api.get<BlogCategory[]>('/blog-category');
    return response.data;
  },
};

