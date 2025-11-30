import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsObject()
  socialLinks?: Record<string, string>;
}

