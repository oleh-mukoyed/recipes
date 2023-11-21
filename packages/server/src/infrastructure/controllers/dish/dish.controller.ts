import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiDefaultResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DishModel } from 'src/domain/model/dish';
import { LoggingInterceptor } from 'src/infrastructure/common/interceptors/logger.interceptor';
import { ResponseInterceptor } from 'src/infrastructure/common/interceptors/response.interceptor';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { addDishUseCases } from 'src/usecases/dish/addDish.usecases';
import { deleteDishUseCases } from 'src/usecases/dish/deleteDish.usecases';
import { getUserDishUseCases } from 'src/usecases/dish/getUserDish.usecases';
import { getUserDishesUseCases } from 'src/usecases/dish/getUserDishes.usecases';
import { updateDishUseCases } from 'src/usecases/dish/updateDish.usecases';

import { AddDishDto, UpdateDishDto } from './dish.dto';
import { DishPresenter } from './dish.presenter';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('dish')
@ApiTags('dish')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(DishPresenter)
export class DishController {
  constructor(
    @Inject(UseCasesProxyModule.GET_USER_DISHES_USE_CASES_PROXY)
    private readonly getUserDishesUseCasesProxy: UseCaseProxy<getUserDishesUseCases>,
    @Inject(UseCasesProxyModule.GET_USER_DISH_USE_CASES_PROXY)
    private readonly getUserDishUseCasesProxy: UseCaseProxy<getUserDishUseCases>,
    @Inject(UseCasesProxyModule.PUT_USER_DISH_USE_CASES_PROXY)
    private readonly updateDishUseCasesProxy: UseCaseProxy<updateDishUseCases>,
    @Inject(UseCasesProxyModule.POST_USER_DISH_USE_CASES_PROXY)
    private readonly addDishUseCasesProxy: UseCaseProxy<addDishUseCases>,
    @Inject(UseCasesProxyModule.DELETE_USER_DISH_USE_CASES_PROXY)
    private readonly deleteDishUseCasesProxy: UseCaseProxy<deleteDishUseCases>,
  ) {}

  @Get('dishes')
  @ApiResponseType(DishPresenter, true)
  async getDishes(@Query('userId', ParseIntPipe) userId: number) {
    const result = await this.getUserDishesUseCasesProxy
      .getInstance()
      .execute(userId);

    return result.map((dishModel) => new DishPresenter(dishModel));
  }

  @Get('dish')
  @ApiResponseType(DishPresenter, true)
  async getDish(
    @Query('id', ParseIntPipe) id: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    const result = await this.getUserDishUseCasesProxy
      .getInstance()
      .execute(id, userId);

    return new DishPresenter(result);
  }

  @Put('dish')
  @ApiResponseType(DishPresenter, true)
  async updateDish(@Body() updateDishDto: UpdateDishDto) {
    const result = await this.updateDishUseCasesProxy
      .getInstance()
      .execute(updateDishDto as Partial<DishModel>);

    return new DishPresenter(result);
  }

  @Post('dish')
  @ApiResponseType(DishPresenter, true)
  async addDish(@Body() addDishDto: AddDishDto) {
    const result = await this.addDishUseCasesProxy
      .getInstance()
      .execute(addDishDto as Partial<DishModel>);

    return new DishPresenter(result);
  }

  @Delete('dish')
  @ApiResponseType(DishPresenter, true)
  async deleteDish(@Query('id', ParseIntPipe) id: number) {
    const result = await this.deleteDishUseCasesProxy.getInstance().execute(id);

    return result;
  }
}
