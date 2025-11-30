# Storage Migration Guide

This document outlines the steps to migrate from local file storage to cloud storage (Cloudinary, AWS S3, etc.).

## Current Implementation

The current implementation uses `LocalStorageService` which stores files in the local filesystem at `./uploads`.

## Architecture

The storage system uses an abstraction layer (`IStorageService` interface) that makes it easy to swap implementations:

- **Interface**: `src/common/storage/storage.interface.ts`
- **Current Implementation**: `src/common/storage/local-storage.service.ts`
- **Module**: `src/common/storage/storage.module.ts`

## Migration Steps

### Option 1: Cloudinary

1. **Install Cloudinary SDK**:
```bash
npm install cloudinary
npm install --save-dev @types/cloudinary
```

2. **Create Cloudinary Service** (`src/common/storage/cloudinary-storage.service.ts`):

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { IStorageService, UploadResult } from './storage.interface';

@Injectable()
export class CloudinaryStorageService implements IStorageService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: Buffer, filename: string, folder?: string): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const uploadOptions: any = {
        resource_type: 'auto',
      };

      if (folder) {
        uploadOptions.folder = folder;
      }

      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              url: result.secure_url,
              path: result.public_id,
              filename: result.original_filename,
            });
          }
        },
      ).end(file);
    });
  }

  async deleteFile(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(path, (error, result) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  getPublicUrl(path: string): string {
    return cloudinary.url(path);
  }

  async fileExists(path: string): Promise<boolean> {
    try {
      const result = await cloudinary.api.resource(path);
      return !!result;
    } catch {
      return false;
    }
  }
}
```

3. **Update Storage Module** (`src/common/storage/storage.module.ts`):

```typescript
import { CloudinaryStorageService } from './cloudinary-storage.service';

const storageProvider = {
  provide: 'IStorageService',
  useClass: CloudinaryStorageService, // Change this line
};
```

4. **Add Environment Variables**:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Option 2: AWS S3

1. **Install AWS SDK**:
```bash
npm install @aws-sdk/client-s3 @aws-sdk/lib-storage
```

2. **Create S3 Service** (`src/common/storage/s3-storage.service.ts`):

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { IStorageService, UploadResult } from './storage.interface';

@Injectable()
export class S3StorageService implements IStorageService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.get('AWS_S3_BUCKET');
  }

  async uploadFile(file: Buffer, filename: string, folder?: string): Promise<UploadResult> {
    const timestamp = Date.now();
    const key = folder ? `${folder}/${timestamp}-${filename}` : `${timestamp}-${filename}`;

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: key,
        Body: file,
        ContentType: this.getContentType(filename),
      },
    });

    await upload.done();

    return {
      url: `https://${this.bucketName}.s3.amazonaws.com/${key}`,
      path: key,
      filename,
    };
  }

  async deleteFile(path: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: path,
      }),
    );
  }

  getPublicUrl(path: string): string {
    return `https://${this.bucketName}.s3.amazonaws.com/${path}`;
  }

  async fileExists(path: string): Promise<boolean> {
    try {
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: path,
        }),
      );
      return true;
    } catch {
      return false;
    }
  }

  private getContentType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    const contentTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      mp4: 'video/mp4',
      mov: 'video/quicktime',
    };
    return contentTypes[ext || ''] || 'application/octet-stream';
  }
}
```

3. **Update Storage Module** (same as Cloudinary, but use `S3StorageService`)

4. **Add Environment Variables**:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
```

## Migration Checklist

- [ ] Choose cloud storage provider
- [ ] Install required SDK
- [ ] Create new storage service implementing `IStorageService`
- [ ] Update `storage.module.ts` to use new service
- [ ] Add environment variables
- [ ] Test file uploads
- [ ] Test file deletions
- [ ] Migrate existing files (if any)
- [ ] Update frontend to use new URLs (if needed)

## Notes

- The interface ensures all methods work the same way regardless of storage backend
- No changes needed in other modules (blog, user, etc.) - they use the interface
- Consider running a migration script to move existing files to cloud storage
- Update CORS settings if using cloud storage with different domains

