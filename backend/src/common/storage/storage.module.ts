import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocalStorageService } from './local-storage.service';
import { IStorageService } from './storage.interface';

// Storage provider factory - easy to swap implementations
const storageProvider = {
  provide: 'IStorageService',
  useClass: LocalStorageService,
};

@Module({
  imports: [ConfigModule],
  providers: [storageProvider, LocalStorageService],
  exports: ['IStorageService', LocalStorageService],
})
export class StorageModule {}

