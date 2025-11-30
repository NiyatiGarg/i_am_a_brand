import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ImageCompressionService } from '../common/image-compression.service';
import { IStorageService } from '../common/storage/storage.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private imageCompressionService: ImageCompressionService,
    @Inject('IStorageService') private storageService: IStorageService,
  ) {}

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        bio: true,
        socialLinks: true,
        createdAt: true,
        blogs: {
          where: { isPublic: true },
          select: {
            id: true,
            title: true,
            thumbnailUrl: true,
            createdAt: true,
          },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Parse socialLinks JSON
    const socialLinks = user.socialLinks ? JSON.parse(user.socialLinks) : {};

    return {
      ...user,
      socialLinks,
    };
  }

  async updateUserProfile(userId: string, updateDto: UpdateUserDto, requesterId: string) {
    // Check if user is updating their own profile
    if (userId !== requesterId) {
      throw new ForbiddenException('You can only update your own profile');
    }

    const updateData: any = {};

    if (updateDto.name !== undefined) {
      updateData.name = updateDto.name;
    }

    if (updateDto.bio !== undefined) {
      updateData.bio = updateDto.bio;
    }

    if (updateDto.socialLinks !== undefined) {
      updateData.socialLinks = JSON.stringify(updateDto.socialLinks);
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        bio: true,
        socialLinks: true,
      },
    });

    const socialLinks = user.socialLinks ? JSON.parse(user.socialLinks) : {};

    return {
      ...user,
      socialLinks,
    };
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Compress image
    const compressedBuffer = await this.imageCompressionService.compressImage(file.buffer, {
      maxWidth: 800,
      maxHeight: 800,
      quality: 85,
      format: 'jpeg',
    });

    // Upload to storage
    const uploadResult = await this.storageService.uploadFile(
      compressedBuffer,
      file.originalname,
      'avatars',
    );

    // Delete old avatar if exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { avatarUrl: true },
    });

    if (user?.avatarUrl) {
      try {
        await this.storageService.deleteFile(user.avatarUrl);
      } catch (error) {
        // Ignore deletion errors
      }
    }

    // Update user
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: uploadResult.url },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        bio: true,
      },
    });

    return updatedUser;
  }
}

