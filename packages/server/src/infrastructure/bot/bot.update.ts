import { Inject } from '@nestjs/common';
import { Command, Ctx, Message, On, Update } from 'nestjs-telegraf';
import { addUserUseCases } from 'src/usecases/user/addUser.usecases';
import { getUserByTelegramIdUseCases } from 'src/usecases/user/getUserByTelegramId.usecases';
import { Context, Markup } from 'telegraf';

import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from '../usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '../usecases-proxy/usecases-proxy.module';

@Update()
export class BotUpdate {
  constructor(
    private readonly configService: EnvironmentConfigService,
    @Inject(UseCasesProxyModule.POST_USER_USE_CASES_PROXY)
    private readonly addUserUseCasesProxy: UseCaseProxy<addUserUseCases>,
    @Inject(UseCasesProxyModule.GET_USER_BY_TELEGRAM_ID_USE_CASES_PROXY)
    private readonly getUserByTelegramIdUseCases: UseCaseProxy<getUserByTelegramIdUseCases>,
  ) {}

  @Command('start')
  async start(@Ctx() ctx: Context) {
    const telegramId = ctx.message.from.id.toString();
    const info = JSON.stringify(ctx.message.from);

    const user = await this.getUserByTelegramIdUseCases
      .getInstance()
      .execute(telegramId);

    console.log('user :', user);
    if (!user) {
      await this.addUserUseCasesProxy.getInstance().execute(telegramId, info);
    }

    ctx.reply(
      '🐈',
      // Markup.keyboard([
      //   Markup.button.webApp(
      //     'Open recipes',
      //     this.configService.getTelegramWebAppUrl(),
      //   ),
      // ]).resize(),
    );
  }

  @On('message')
  async hears(@Ctx() ctx: Context) {
    ctx.reply(
      '🐈',
      // Markup.keyboard([
      //   Markup.button.webApp(
      //     'Open recipes',
      //     this.configService.getTelegramWebAppUrl(),
      //   ),
      // ]).resize(),
    );
  }
}
