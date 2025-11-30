import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return this.userService.getUserProfile(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
    @Req() req: any,
  ) {
    return this.userService.updateUserProfile(id, updateDto, req.user.id);
  }

  @Post('avatar')
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
  async uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatar(req.user.id, file);
  }
}

