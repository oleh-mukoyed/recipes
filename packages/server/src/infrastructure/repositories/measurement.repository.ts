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
        measurements.map((measurement) => {
          let newMeasurement = {
            id: measurement.id,
            sort: measurement.sort,
            childMultiplier: measurement.childMultiplier,
            name: measurement.localeName[0].name,
            shortName: measurement.localeShortName[0].name,
          };

          if (measurement?.child) {
            newMeasurement['child'] = {
              id: measurement.child.id,
              sort: measurement.child.sort,
              childMultiplier: measurement.child.childMultiplier,
              name: measurement.child.localeName[0].name,
              shortName: measurement.child.localeShortName[0].name,
            };
          }

          if (measurement?.parent) {
            newMeasurement['parent'] = {
              id: measurement.parent.id,
              sort: measurement.parent.sort,
              childMultiplier: measurement.parent.childMultiplier,
              name: measurement.parent.localeName[0].name,
              shortName: measurement.parent.localeShortName[0].name,
            };
          }

          return newMeasurement;
        }),
      );

    return result as Array<MeasurementModel>;
  }
}
