import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/infrastructure/common/interceptors/logger.interceptor';
import { ResponseInterceptor } from 'src/infrastructure/common/interceptors/response.interceptor';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { addUserUseCases } from 'src/usecases/user/addUser.usecases';
import { getUserByTelegramIdUseCases } from 'src/usecases/user/getUserByTelegramId.usecases';

import { AddUserDto } from './user.dto';
import { UserPresenter } from './user.presenter';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UseCasesProxyModule.POST_USER_USE_CASES_PROXY)
    private readonly addUserUseCasesProxy: UseCaseProxy<addUserUseCases>,
    @Inject(UseCasesProxyModule.GET_USER_BY_TELEGRAM_ID_USE_CASES_PROXY)
    private readonly getUserByTelegramIdUseCasesProxy: UseCaseProxy<getUserByTelegramIdUseCases>,
  ) {}

  @Post('user')
  @ApiResponseType(UserPresenter, true)
  async addUser(@Body() addUserDto: AddUserDto) {
    const { telegramId, info } = addUserDto;
    const addResult = await this.addUserUseCasesProxy
      .getInstance()
      .execute(telegramId, info);

    return new UserPresenter(addResult);
  }

  @Get('user')
  @ApiResponseType(UserPresenter, true)
  async getUserByTelegramId(@Query('telegramId') telegramId: string) {
    const result = await this.getUserByTelegramIdUseCasesProxy
      .getInstance()
      .execute(telegramId);

    return new UserPresenter(result);
  }
}
