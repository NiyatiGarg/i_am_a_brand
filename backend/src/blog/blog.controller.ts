import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBlog(@Body() createDto: CreateBlogDto, @Req() req: any) {
    return this.blogService.createBlog(req.user.id, createDto);
  }

  @Public()
  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.blogService.findAllPublic(pageNum, limitNum, categoryId, search);
  }

  @Get('my-blogs')
  @UseGuards(JwtAuthGuard)
  async findMyBlogs(@Req() req: any) {
    return this.blogService.findMyBlogs(req.user.id);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id;
    return this.blogService.findOne(id, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateBlog(
    @Param('id') id: string,
    @Body() updateDto: UpdateBlogDto,
    @Req() req: any,
  ) {
    return this.blogService.updateBlog(id, req.user.id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteBlog(@Param('id') id: string, @Req() req: any) {
    return this.blogService.deleteBlog(id, req.user.id);
  }

  @Post(':id/media')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/gif',
          'image/webp',
          'video/mp4',
          'video/quicktime',
        ];
        if (!allowedMimes.includes(file.mimetype)) {
          return cb(new BadRequestException('Invalid file type'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadMedia(
    @Param('id') id: string,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    return this.blogService.uploadMedia(id, req.user.id, file);
  }

  @Post(':id/thumbnail')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new BadRequestException('Only image files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadThumbnail(
    @Param('id') id: string,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    return this.blogService.uploadThumbnail(id, req.user.id, file);
  }
}

