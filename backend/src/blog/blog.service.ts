import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ImageCompressionService } from '../common/image-compression.service';
import { IStorageService } from '../common/storage/storage.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class BlogService {
  constructor(
    private prisma: PrismaService,
    private imageCompressionService: ImageCompressionService,
    @Inject('IStorageService') private storageService: IStorageService,
  ) {}

  async createBlog(userId: string, createDto: CreateBlogDto) {
    // Validate category if provided
    if (createDto.categoryId) {
      const category = await this.prisma.blogCategory.findUnique({
        where: { id: createDto.categoryId },
      });

      if (!category) {
        throw new BadRequestException('Category not found');
      }
    }

    const blog = await this.prisma.blog.create({
      data: {
        ...createDto,
        authorId: userId,
        isPublic: createDto.isPublic ?? true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        category: true,
        media: true,
      },
    });

    return blog;
  }

  async findAllPublic(page: number = 1, limit: number = 10, categoryId?: string, search?: string) {
    const skip = (page - 1) * limit;

    const where: any = {
      isPublic: true,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
      ];
    }

    const [blogs, total] = await Promise.all([
      this.prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
          category: true,
        },
      }),
      this.prisma.blog.count({ where }),
    ]);

    return {
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findMyBlogs(userId: string) {
    return this.prisma.blog.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        media: true,
      },
    });
  }

  async findOne(id: string, userId?: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            bio: true,
          },
        },
        category: true,
        media: true,
      },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Check if user can access private blog
    if (!blog.isPublic && blog.authorId !== userId) {
      throw new ForbiddenException('You do not have permission to view this blog');
    }

    return blog;
  }

  async updateBlog(id: string, userId: string, updateDto: UpdateBlogDto) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.authorId !== userId) {
      throw new ForbiddenException('You can only update your own blogs');
    }

    // Validate category if provided
    if (updateDto.categoryId) {
      const category = await this.prisma.blogCategory.findUnique({
        where: { id: updateDto.categoryId },
      });

      if (!category) {
        throw new BadRequestException('Category not found');
      }
    }

    const updatedBlog = await this.prisma.blog.update({
      where: { id },
      data: updateDto,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        category: true,
        media: true,
      },
    });

    return updatedBlog;
  }

  async deleteBlog(id: string, userId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: { media: true },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own blogs');
    }

    // Delete associated media files
    for (const media of blog.media) {
      try {
        await this.storageService.deleteFile(media.url);
      } catch (error) {
        // Ignore deletion errors
      }
    }

    // Delete thumbnail if exists
    if (blog.thumbnailUrl) {
      try {
        await this.storageService.deleteFile(blog.thumbnailUrl);
      } catch (error) {
        // Ignore deletion errors
      }
    }

    await this.prisma.blog.delete({
      where: { id },
    });

    return { message: 'Blog deleted successfully' };
  }

  async uploadMedia(blogId: string, userId: string, file: Express.Multer.File) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.authorId !== userId) {
      throw new ForbiddenException('You can only upload media to your own blogs');
    }

    let compressedBuffer: Buffer;
    let type: 'image' | 'video' = 'image';

    // Check if it's a video
    if (file.mimetype.startsWith('video/')) {
      type = 'video';
      compressedBuffer = file.buffer; // Don't compress videos
    } else {
      // Compress image
      compressedBuffer = await this.imageCompressionService.compressImage(file.buffer, {
        maxWidth: 1920,
        maxHeight: 1920,
        quality: 85,
        format: 'jpeg',
      });
    }

    // Upload to storage
    const folder = type === 'image' ? 'blog-images' : 'blog-videos';
    const uploadResult = await this.storageService.uploadFile(
      compressedBuffer,
      file.originalname,
      folder,
    );

    // Create media record
    const media = await this.prisma.blogMedia.create({
      data: {
        blogId,
        url: uploadResult.url,
        type,
      },
    });

    return media;
  }

  async uploadThumbnail(blogId: string, userId: string, file: Express.Multer.File) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.authorId !== userId) {
      throw new ForbiddenException('You can only upload thumbnails to your own blogs');
    }

    // Generate thumbnail
    const thumbnailBuffer = await this.imageCompressionService.generateThumbnail(file.buffer, 800, 600);

    // Upload to storage
    const uploadResult = await this.storageService.uploadFile(
      thumbnailBuffer,
      file.originalname,
      'blog-thumbnails',
    );

    // Delete old thumbnail if exists
    if (blog.thumbnailUrl) {
      try {
        await this.storageService.deleteFile(blog.thumbnailUrl);
      } catch (error) {
        // Ignore deletion errors
      }
    }

    // Update blog
    const updatedBlog = await this.prisma.blog.update({
      where: { id: blogId },
      data: { thumbnailUrl: uploadResult.url },
    });

    return updatedBlog;
  }
}

