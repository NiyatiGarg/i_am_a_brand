import { useState } from 'react';
import { storageService } from '@/services/storage.service';

export function useImageCompression() {
  const [compressing, setCompressing] = useState(false);

  const compressImage = async (file: File, options?: { maxSizeMB?: number; maxWidthOrHeight?: number }) => {
    setCompressing(true);
    try {
      const compressed = await storageService.compressImage(file, options);
      return compressed;
    } finally {
      setCompressing(false);
    }
  };

  const compressThumbnail = async (file: File) => {
    return compressImage(file, { maxSizeMB: 0.5, maxWidthOrHeight: 800 });
  };

  return { compressImage, compressThumbnail, compressing };
}

