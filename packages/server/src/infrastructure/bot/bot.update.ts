import { Command, Ctx, On, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  constructor() // private readonly addOrUpdateUserUseCasesProxy: UseCaseProxy<addOrUpdateUserUseCases>, // @Inject(UseCasesProxyModule.POST_USER_USE_CASES_PROXY) // private readonly configService: EnvironmentConfigService,
  // @Inject(UseCasesProxyModule.GET_USER_BY_TELEGRAM_ID_USE_CASES_PROXY)
  // private readonly getUserByTelegramIdUseCases: UseCaseProxy<getUserByTelegramIdUseCases>,
  {}

  @Command('start')
  async start(@Ctx() ctx: Context) {
    // const telegramId = ctx.message.from.id.toString();
    // const info = JSON.stringify(ctx.message.from);

    // const user = await this.getUserByTelegramIdUseCases
    //   .getInstance()
    //   .execute(telegramId);

    // console.log('user :', user);
    // if (!user) {
    //   await this.addOrUpdateUserUseCasesProxy
    //     .getInstance()
    //     .execute(telegramId, info);
    // }

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
