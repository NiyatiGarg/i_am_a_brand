import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BlogCategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
    });
  }
}

