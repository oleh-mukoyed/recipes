import { MeasurementModel } from '../model/measurement';

export interface MeasurementRepository {
  findAll(): Promise<MeasurementModel[]>;
}
