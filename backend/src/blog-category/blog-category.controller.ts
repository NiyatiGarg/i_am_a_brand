import { Controller, Get } from '@nestjs/common';
import { BlogCategoryService } from './blog-category.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('blog-category')
export class BlogCategoryController {
  constructor(private blogCategoryService: BlogCategoryService) {}

  @Public()
  @Get()
  findAll() {
    return this.blogCategoryService.findAll();
  }
}

