import { Injectable } from '@nestjs/common';
import { MeasurementModel } from 'src/domain/model/measurement';
import { MeasurementRepository } from 'src/domain/repositories/measurementRepository.interface';

import { PrismaService } from '../prisma.service';

@Injectable()
export class DatabaseMeasurementRepository implements MeasurementRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(locale: string): Promise<MeasurementModel[]> {
    const selectFields = {
      id: true,
      sort: true,
      childMultiplier: true,
      localeName: {
        select: { name: true },
        where: { locale: locale },
      },
      localeShortName: {
        select: { name: true },
        where: { locale: locale },
      },
    };
    const result = await this.prisma.measurement
      .findMany({
        orderBy: [{ sort: 'asc' }, { name: 'asc' }],
        select: {
          ...selectFields,
          child: {
            select: {
              ...selectFields,
            },
          },
          parent: {
            select: {
              ...selectFields,
            },
          },
        },
      })
      .then((measurements) =>
        measurements.map((measurement) => ({
          id: measurement.id,
          sort: measurement.sort,
          childMultiplier: measurement.childMultiplier,
          name: measurement.localeName[0].name,
          shortName: measurement.localeShortName[0].name,
          child: {
            id: measurement.id,
            sort: measurement.sort,
            childMultiplier: measurement.childMultiplier,
            name: measurement.localeName[0].name,
            shortName: measurement.localeShortName[0].name,
          },
          parent: {
            id: measurement.id,
            sort: measurement.sort,
            childMultiplier: measurement.childMultiplier,
            name: measurement.localeName[0].name,
            shortName: measurement.localeShortName[0].name,
          },
        })),
      );

    return result as Array<MeasurementModel>;
  }
}
