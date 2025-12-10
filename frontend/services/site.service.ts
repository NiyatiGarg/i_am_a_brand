import api from '@/lib/api';

export interface SiteMeta {
  id: string;
  homepage: {
    hero?: {
      name: string;
      tagline: string;
      elevatorPitch: string;
    };
    about?: {
      html: string;
    };
    highlights?: any[];
  };
  updatedAt: string;
  updatedBy?: string;
}

export const siteService = {
  async getSiteMeta(): Promise<SiteMeta> {
    const response = await api.get<SiteMeta>('/site');
    return response.data;
  },

  async updateSiteMeta(homepage: SiteMeta['homepage']): Promise<SiteMeta> {
    const response = await api.patch<SiteMeta>('/site', { homepage });
    return response.data;
  },
};

