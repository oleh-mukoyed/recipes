import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { BotUpdate } from './bot.update';

@Module({
  imports: [
    UseCasesProxyModule.register(),
    EnvironmentConfigModule,
    TelegrafModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      useFactory: async (configService: EnvironmentConfigService) => ({
        token: configService.getTelegramToken(),
      }),
      inject: [EnvironmentConfigService],
    }),
  ],
  providers: [BotUpdate],
})
export class BotModule {}
