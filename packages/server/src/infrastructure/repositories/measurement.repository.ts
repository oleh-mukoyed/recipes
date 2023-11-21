import { Injectable } from '@nestjs/common';
import { MeasurementModel } from 'src/domain/model/measurement';
import { MeasurementRepository } from 'src/domain/repositories/measurementRepository.interface';

import { PrismaService } from '../prisma.service';

@Injectable()
export class DatabaseMeasurementRepository implements MeasurementRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MeasurementModel[]> {
    const result = await this.prisma.measurement.findMany({
      orderBy: [{ sort: 'asc' }, { name: 'asc' }],
      select: {
        id: true,
        sort: true,
        name: true,
        shortName: true,
        childMultiplier: true,
        child: {
          select: {
            id: true,
            sort: true,
            name: true,
            shortName: true,
            childMultiplier: true,
          },
        },
        parent: {
          select: {
            id: true,
            sort: true,
            name: true,
            shortName: true,
            childMultiplier: true,
          },
        },
      },
    });

    return result as Array<MeasurementModel>;
  }
}
