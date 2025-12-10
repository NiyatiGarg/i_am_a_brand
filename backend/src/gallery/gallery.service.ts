import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IStorageService } from '../common/storage/storage.interface';
import { Inject } from '@nestjs/common';
import { ImageCompressionService } from '../common/image-compression.service';

@Injectable()
export class GalleryService {
  constructor(
    private prisma: PrismaService,
    @Inject('IStorageService') private storageService: IStorageService,
    private imageCompressionService: ImageCompressionService,
  ) {}

  async findAll() {
    return this.prisma.gallery.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findLatest(limit: number = 6) {
    return this.prisma.gallery.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      throw new BadRequestException('Only image files are allowed');
    }

    // Compress image
    const compressedBuffer = await this.imageCompressionService.compressImage(file.buffer, {
      maxWidth: 1920,
      maxHeight: 1920,
      quality: 85,
      format: 'jpeg',
    });

    // Upload to storage
    const uploadResult = await this.storageService.uploadFile(
      compressedBuffer,
      file.originalname,
      'gallery',
    );

    // Get current max order
    const maxOrder = await this.prisma.gallery.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    // Create gallery record
    const gallery = await this.prisma.gallery.create({
      data: {
        url: uploadResult.url,
        alt: file.originalname,
        order: (maxOrder?.order ?? -1) + 1,
      },
    });

    return gallery;
  }

  async deleteImage(id: string) {
    const gallery = await this.prisma.gallery.findUnique({
      where: { id },
    });

    if (!gallery) {
      throw new NotFoundException('Gallery image not found');
    }

    // Delete file from storage
    try {
      await this.storageService.deleteFile(gallery.url);
    } catch (error) {
      // Ignore deletion errors
    }

    await this.prisma.gallery.delete({
      where: { id },
    });

    return { message: 'Image deleted successfully' };
  }

  async reorderImages(ids: string[]) {
    const updates = ids.map((id, index) =>
      this.prisma.gallery.update({
        where: { id },
        data: { order: index },
      }),
    );

    await Promise.all(updates);
    return this.findAll();
  }
}

