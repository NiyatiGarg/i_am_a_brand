import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { SiteMetaService } from './site-meta.service';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('site')
export class SiteMetaController {
  constructor(private siteMetaService: SiteMetaService) {}

  @Public()
  @Get()
  async getSiteMeta() {
    return this.siteMetaService.getSiteMeta();
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updateSiteMeta(@Body() body: { homepage: any }, @Req() req: any) {
    return this.siteMetaService.updateSiteMeta(req.user.id, body.homepage);
  }
}

