import { MiddlewareConsumer, Module } from '@nestjs/common';

import { BotModule } from './infrastructure/bot/bot.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [
    BotModule,
    ControllersModule,
    //EnvironmentConfigModule,
    //ExceptionsModule,
  ],
})
export class AppModule {
  /* configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  } */
}
