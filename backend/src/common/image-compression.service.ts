import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

@Injectable()
export class ImageCompressionService {
  /**
   * Compress an image buffer
   * @param buffer Image buffer
   * @param options Compression options
   * @returns Compressed image buffer
   */
  async compressImage(
    buffer: Buffer,
    options: CompressionOptions = {},
  ): Promise<Buffer> {
    const {
      maxWidth = 1920,
      maxHeight = 1920,
      quality = 85,
      format = 'jpeg',
    } = options;

    let sharpInstance = sharp(buffer);

    // Resize if needed
    const metadata = await sharpInstance.metadata();
    if (metadata.width && metadata.width > maxWidth) {
      sharpInstance = sharpInstance.resize(maxWidth, null, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    } else if (metadata.height && metadata.height > maxHeight) {
      sharpInstance = sharpInstance.resize(null, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Convert and compress
    switch (format) {
      case 'webp':
        return sharpInstance.webp({ quality }).toBuffer();
      case 'png':
        return sharpInstance.png({ quality }).toBuffer();
      case 'jpeg':
      default:
        return sharpInstance.jpeg({ quality }).toBuffer();
    }
  }

  /**
   * Generate thumbnail from image
   * @param buffer Image buffer
   * @param width Thumbnail width
   * @param height Thumbnail height
   * @returns Thumbnail buffer
   */
  async generateThumbnail(
    buffer: Buffer,
    width: number = 400,
    height: number = 400,
  ): Promise<Buffer> {
    return sharp(buffer)
      .resize(width, height, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({ quality: 80 })
      .toBuffer();
  }
}

