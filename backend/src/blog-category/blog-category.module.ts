import { Module } from '@nestjs/common';
import { BlogCategoryController } from './blog-category.controller';
import { BlogCategoryService } from './blog-category.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogCategoryController],
  providers: [BlogCategoryService],
  exports: [BlogCategoryService],
})
export class BlogCategoryModule {}

