import api from '@/lib/api';
import { User } from '@/types';

export interface UpdateUserData {
  name?: string;
  bio?: string;
  socialLinks?: Record<string, string>;
}

export const userService = {
  async getUserProfile(userId: string): Promise<User & { blogs?: any[] }> {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  },

  async updateUserProfile(userId: string, data: UpdateUserData): Promise<User> {
    const response = await api.patch(`/user/${userId}`, data);
    return response.data;
  },

  async uploadAvatar(file: File): Promise<User> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

