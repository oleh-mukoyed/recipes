import { Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';
import { UseCasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { DishController } from './dish/dish.controller';
import { MeasurementController } from './measurement/measurement.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [UseCasesProxyModule.register(), LoggerModule],
  controllers: [UserController, DishController, MeasurementController],
})
export class ControllersModule {}
