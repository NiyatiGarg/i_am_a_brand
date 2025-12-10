import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SiteMetaService {
  constructor(private prisma: PrismaService) {}

  async getSiteMeta() {
    let siteMeta = await this.prisma.siteMeta.findUnique({
      where: { id: 'site_meta' },
    });

    if (!siteMeta) {
      // Initialize with default values
      siteMeta = await this.prisma.siteMeta.create({
        data: {
          id: 'site_meta',
          homepage: JSON.stringify({
            hero: {
              name: 'Niyati Garg',
              tagline: 'Frontend Developer | Fitness & Lifestyle Creator',
              elevatorPitch: 'I build modern, accessible front-ends and small full-stack apps using React, Next.js and a healthy dose of curiosity.',
            },
            about: {
              html: '<p>Hi — I\'m Niyati Garg. I build modern, accessible front-ends and small full-stack apps using React, Next.js and a healthy dose of curiosity.</p><p>I focus on clean UI, thoughtful interactions, and shipping features that make people\'s lives easier.</p><p>I\'ve worked on projects ranging from e-commerce scan-and-go experiences to personal projects exploring emotion detection using cameras.</p><p>If you\'re here to explore my work, the gallery and latest blog posts are below — everything on this site can be edited from the admin panel when I\'m logged in.</p>',
            },
            highlights: [],
          }),
        },
      });
    }

    return {
      ...siteMeta,
      homepage: siteMeta.homepage ? JSON.parse(siteMeta.homepage) : null,
    };
  }

  async updateSiteMeta(userId: string, homepage: any) {
    const existing = await this.prisma.siteMeta.findUnique({
      where: { id: 'site_meta' },
    });

    if (!existing) {
      return this.prisma.siteMeta.create({
        data: {
          id: 'site_meta',
          homepage: JSON.stringify(homepage),
          updatedBy: userId,
        },
      });
    }

    return this.prisma.siteMeta.update({
      where: { id: 'site_meta' },
      data: {
        homepage: JSON.stringify(homepage),
        updatedBy: userId,
      },
    });
  }
}

