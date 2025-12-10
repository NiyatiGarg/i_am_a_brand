import { IsString, IsOptional, IsBoolean, IsUUID, IsArray } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsString()
  content: string; // Markdown or HTML content

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  status?: string; // "draft" | "published"

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  thumbnailSource?: string; // "upload" | "external"

  @IsOptional()
  @IsArray()
  tags?: string[];
}

