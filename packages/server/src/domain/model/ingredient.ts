import { MeasurementModel } from './measurement';

export class IngredientModel {
  id: number;
  sort: number;
  name: string;
  number: string;
  dishId?: number;
  createdAt: Date;
  updatedAt: Date;
  measurementId: number;
  measurement: MeasurementModel;
}
