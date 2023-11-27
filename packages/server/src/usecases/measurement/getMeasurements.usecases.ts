import { ILogger } from 'src/domain/logger/logger.interface';
import { MeasurementModel } from 'src/domain/model/measurement';
import { MeasurementRepository } from 'src/domain/repositories/measurementRepository.interface';

export class getMeasurementsUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly measurementRepository: MeasurementRepository,
  ) {}

  async execute(locale: string): Promise<MeasurementModel[]> {
    const result = await this.measurementRepository.findAll(locale);
    this.logger.log(
      'getMeasurementsUseCases execute',
      `measurements - ${result.length}`,
    );

    return result;
  }
}
