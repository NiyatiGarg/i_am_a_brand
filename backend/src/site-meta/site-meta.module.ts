import { Module } from '@nestjs/common';
import { SiteMetaController } from './site-meta.controller';
import { SiteMetaService } from './site-meta.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SiteMetaController],
  providers: [SiteMetaService],
  exports: [SiteMetaService],
})
export class SiteMetaModule {}

