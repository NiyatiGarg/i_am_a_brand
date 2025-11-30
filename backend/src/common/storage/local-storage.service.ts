import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { IStorageService, UploadResult } from './storage.interface';

@Injectable()
export class LocalStorageService implements IStorageService {
  private readonly storagePath: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.storagePath = this.configService.get<string>('STORAGE_PATH') || './uploads';
    this.baseUrl = this.configService.get<string>('STORAGE_BASE_URL') || '/uploads';
    this.ensureDirectoryExists();
  }

  private async ensureDirectoryExists() {
    try {
      await fs.mkdir(this.storagePath, { recursive: true });
    } catch (error) {
      console.error('Failed to create storage directory:', error);
    }
  }

  async uploadFile(file: Buffer, filename: string, folder?: string): Promise<UploadResult> {
    await this.ensureDirectoryExists();

    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);
    const uniqueFilename = `${baseName}-${timestamp}${ext}`;

    // Create folder path if specified
    const folderPath = folder ? path.join(this.storagePath, folder) : this.storagePath;
    await fs.mkdir(folderPath, { recursive: true });

    const filePath = path.join(folderPath, uniqueFilename);
    const relativePath = folder ? path.join(folder, uniqueFilename) : uniqueFilename;

    // Write file
    await fs.writeFile(filePath, file);

    return {
      url: this.getPublicUrl(relativePath),
      path: filePath,
      filename: uniqueFilename,
    };
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      // If it's a URL, extract the path
      const pathToDelete = filePath.startsWith('/') 
        ? path.join(this.storagePath, filePath.replace(this.baseUrl, ''))
        : filePath;

      await fs.unlink(pathToDelete);
    } catch (error) {
      // File might not exist, that's okay
      console.warn('Failed to delete file:', error);
    }
  }

  getPublicUrl(filePath: string): string {
    // Remove storage path prefix if present
    const relativePath = filePath.startsWith(this.storagePath)
      ? filePath.replace(this.storagePath, '').replace(/^[\/\\]/, '')
      : filePath;

    return `${this.baseUrl}/${relativePath.replace(/\\/g, '/')}`;
  }

  async fileExists(filePath: string): Promise<boolean> {
    try {
      const pathToCheck = filePath.startsWith('/')
        ? path.join(this.storagePath, filePath.replace(this.baseUrl, ''))
        : filePath;

      await fs.access(pathToCheck);
      return true;
    } catch {
      return false;
    }
  }
}

