import api from '@/lib/api';

export interface GalleryImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export const galleryService = {
  async getAll(): Promise<GalleryImage[]> {
    const response = await api.get<GalleryImage[]>('/gallery');
    return response.data;
  },

  async getLatest(limit: number = 6): Promise<GalleryImage[]> {
    const response = await api.get<GalleryImage[]>(`/gallery?limit=${limit}`);
    return response.data;
  },

  async uploadImage(file: File): Promise<GalleryImage> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<GalleryImage>('/gallery/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteImage(id: string): Promise<void> {
    await api.delete(`/gallery/${id}`);
  },

  async reorderImages(ids: string[]): Promise<GalleryImage[]> {
    const response = await api.post<GalleryImage[]>('/gallery/reorder', { ids });
    return response.data;
  },
};

