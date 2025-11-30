import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: NestConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT') || 3001;
  }

  get frontendUrl(): string {
    return this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || 'default-secret';
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN') || '15m';
  }

  get jwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET') || 'default-refresh-secret';
  }

  get jwtRefreshExpiresIn(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';
  }

  get storageType(): string {
    return this.configService.get<string>('STORAGE_TYPE') || 'local';
  }

  get storagePath(): string {
    return this.configService.get<string>('STORAGE_PATH') || './uploads';
  }

  get smtpHost(): string {
    return this.configService.get<string>('SMTP_HOST') || '';
  }

  get smtpPort(): number {
    return this.configService.get<number>('SMTP_PORT') || 587;
  }

  get smtpUser(): string {
    return this.configService.get<string>('SMTP_USER') || '';
  }

  get smtpPass(): string {
    return this.configService.get<string>('SMTP_PASS') || '';
  }

  get emailFrom(): string {
    return this.configService.get<string>('EMAIL_FROM') || 'noreply@personalbrand.com';
  }
}

