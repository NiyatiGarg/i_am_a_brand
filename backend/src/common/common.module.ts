import { Module, Global } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { ImageCompressionService } from './image-compression.service';

@Global()
@Module({
  imports: [StorageModule],
  providers: [ImageCompressionService],
  exports: [StorageModule, ImageCompressionService],
})
export class CommonModule {}

