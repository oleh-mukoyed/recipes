import { DynamicModule, Module } from '@nestjs/common';
import { addDishUseCases } from 'src/usecases/dish/addDish.usecases';
import { deleteDishUseCases } from 'src/usecases/dish/deleteDish.usecases';
import { getUserDishUseCases } from 'src/usecases/dish/getUserDish.usecases';
import { getUserDishesUseCases } from 'src/usecases/dish/getUserDishes.usecases';
import { updateDishUseCases } from 'src/usecases/dish/updateDish.usecases';
import { getMeasurementsUseCases } from 'src/usecases/measurement/getMeasurements.usecases';
import { addUserUseCases } from 'src/usecases/user/addUser.usecases';
import { getUserByTelegramIdUseCases } from 'src/usecases/user/getUserByTelegramId.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { DatabaseDishRepository } from '../repositories/dish.repository';
import { DatabaseMeasurementRepository } from '../repositories/measurement.repository';
import { RepositoriesModule } from '../repositories/repositories.mudule';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UseCasesProxyModule {
  static POST_USER_USE_CASES_PROXY = 'postUserUseCasesProxy';
  static GET_USER_BY_TELEGRAM_ID_USE_CASES_PROXY =
    'getUserByTelegramIdUseCases';

  static PUT_USER_DISH_USE_CASES_PROXY = 'updateDishUseCases';
  static POST_USER_DISH_USE_CASES_PROXY = 'addDishUseCases';
  static DELETE_USER_DISH_USE_CASES_PROXY = 'deleteDishUseCases';
  static GET_USER_DISHES_USE_CASES_PROXY = 'getUserDishesUseCases';
  static GET_USER_DISH_USE_CASES_PROXY = 'getUserDishUseCases';
  static GET_MEASUREMENTS_USE_CASES_PROXY = 'getMeasurementsUseCases';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UseCasesProxyModule.POST_USER_USE_CASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) => new UseCaseProxy(new addUserUseCases(logger, userRepository)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UseCasesProxyModule.GET_USER_BY_TELEGRAM_ID_USE_CASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) =>
            new UseCaseProxy(
              new getUserByTelegramIdUseCases(logger, userRepository),
            ),
        },
        {
          inject: [LoggerService, DatabaseDishRepository],
          provide: UseCasesProxyModule.PUT_USER_DISH_USE_CASES_PROXY,
          useFactory: (
            logger: LoggerService,
            dishRepository: DatabaseDishRepository,
          ) => new UseCaseProxy(new updateDishUseCases(logger, dishRepository)),
        },
        {
          inject: [LoggerService, DatabaseDishRepository],
          provide: UseCasesProxyModule.POST_USER_DISH_USE_CASES_PROXY,
          useFactory: (
            logger: LoggerService,
            dishRepository: DatabaseDishRepository,
          ) => new UseCaseProxy(new addDishUseCases(logger, dishRepository)),
        },
        {
          inject: [LoggerService, DatabaseDishRepository],
          provide: UseCasesProxyModule.DELETE_USER_DISH_USE_CASES_PROXY,
          useFactory: (
            logger: LoggerService,
            dishRepository: DatabaseDishRepository,
          ) => new UseCaseProxy(new deleteDishUseCases(logger, dishRepository)),
        },
        {
          inject: [LoggerService, DatabaseDishRepository],
          provide: UseCasesProxyModule.GET_USER_DISHES_USE_CASES_PROXY,
          useFactory: (
            logger: LoggerService,
            dishRepository: DatabaseDishRepository,
          ) =>
            new UseCaseProxy(new getUserDishesUseCases(logger, dishRepository)),
        },
        {
          inject: [LoggerService, DatabaseDishRepository],
          provide: UseCasesProxyModule.GET_USER_DISH_USE_CASES_PROXY,
          useFactory: (
            logger: LoggerService,
            dishRepository: DatabaseDishRepository,
          ) =>
            new UseCaseProxy(new getUserDishUseCases(logger, dishRepository)),
        },
        {
          inject: [LoggerService, DatabaseMeasurementRepository],
          provide: UseCasesProxyModule.GET_MEASUREMENTS_USE_CASES_PROXY,
          useFactory: (
            logger: LoggerService,
            measurementRepository: DatabaseMeasurementRepository,
          ) =>
            new UseCaseProxy(
              new getMeasurementsUseCases(logger, measurementRepository),
            ),
        },
      ],
      exports: [
        UseCasesProxyModule.POST_USER_USE_CASES_PROXY,
        UseCasesProxyModule.GET_USER_BY_TELEGRAM_ID_USE_CASES_PROXY,

        UseCasesProxyModule.PUT_USER_DISH_USE_CASES_PROXY,
        UseCasesProxyModule.POST_USER_DISH_USE_CASES_PROXY,
        UseCasesProxyModule.DELETE_USER_DISH_USE_CASES_PROXY,
        UseCasesProxyModule.GET_USER_DISHES_USE_CASES_PROXY,
        UseCasesProxyModule.GET_USER_DISH_USE_CASES_PROXY,
        UseCasesProxyModule.GET_MEASUREMENTS_USE_CASES_PROXY,
      ],
    };
  }
}
