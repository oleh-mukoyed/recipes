import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BotConfig } from 'src/domain/config/bot.interface';

@Injectable()
export class EnvironmentConfigService implements BotConfig {
  constructor(private configService: ConfigService) {}

  getTelegramWebAppUrl(): string {
    return this.configService.get<string>('TELEGRAM_WEB_APP_URL');
  }

  getTelegramToken(): string {
    return this.configService.get<string>('TELEGRAM_TOKEN');
  }

  getHttpPort(): string {
    return this.configService.get<string>('SERVER_PORT');
  }

  getHttpsPort(): string {
    return this.configService.get<string>('SERVER_HTTPS_PORT');
  }

  getClientHost(): string {
    return this.configService.get<string>('CLIENT_HOST');
  }
}
