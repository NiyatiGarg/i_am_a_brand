import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
}

export const storageService = {
  async compressImage(
    file: File,
    options: CompressionOptions = {},
  ): Promise<File> {
    const defaultOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      ...options,
    };

    try {
      const compressedFile = await imageCompression(file, defaultOptions);
      return compressedFile;
    } catch (error) {
      console.error('Image compression failed:', error);
      // Return original file if compression fails
      return file;
    }
  },

  async compressImageForThumbnail(file: File): Promise<File> {
    return this.compressImage(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
    });
  },
};

