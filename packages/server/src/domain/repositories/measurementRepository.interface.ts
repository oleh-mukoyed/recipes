import { MeasurementModel } from '../model/measurement';

export interface MeasurementRepository {
  findAll(locale: string): Promise<MeasurementModel[]>;
}
