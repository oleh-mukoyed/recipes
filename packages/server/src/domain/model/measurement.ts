export class MeasurementModel {
  id: number;
  sort: number;
  name: string;
  shortName: string;
  childMultiplier?: number;
  createdAt: Date;
  updatedAt: Date;
  childId?: number;
  child: MeasurementModel;
  parent: MeasurementModel;
}
