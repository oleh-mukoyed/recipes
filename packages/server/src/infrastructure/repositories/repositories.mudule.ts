import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { DatabaseDishRepository } from './dish.repository';
import { DatabaseMeasurementRepository } from './measurement.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  providers: [
    PrismaService,
    DatabaseUserRepository,
    DatabaseDishRepository,
    DatabaseMeasurementRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseDishRepository,
    DatabaseMeasurementRepository,
  ],
})
export class RepositoriesModule {}
