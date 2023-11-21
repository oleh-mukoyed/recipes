import { ApiProperty } from '@nestjs/swagger';
import { MeasurementModel } from 'src/domain/model/measurement';

class MeasurementChildPresenter {
  @ApiProperty()
  id: number;
  // @ApiProperty()
  // sort: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  shortName: string;
  @ApiProperty({ required: false })
  childMultiplier: number;
  // @ApiProperty()
  // createdAt: Date;
  // @ApiProperty()
  // updatedAt: Date;
}

export class MeasurementPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  sort: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  shortName: string;
  @ApiProperty({ required: false })
  childMultiplier: number;
  // @ApiProperty()
  // createdAt: Date;
  // @ApiProperty()
  // updatedAt: Date;
  // @ApiProperty({ required: false })
  // childId: number;
  @ApiProperty({ type: MeasurementChildPresenter, required: false })
  child: MeasurementChildPresenter;
  @ApiProperty({ type: MeasurementChildPresenter, required: false })
  parent: MeasurementChildPresenter;

  constructor(measurement: MeasurementModel) {
    this.id = measurement.id;
    this.sort = measurement.sort;
    this.name = measurement.name;
    this.shortName = measurement.shortName;
    this.childMultiplier = measurement.childMultiplier;
    // this.createdAt = measurement.createdAt;
    // this.updatedAt = measurement.updatedAt;
    // this.childId = measurement.childId;
    this.child = measurement.child as MeasurementChildPresenter;
    this.parent = measurement.parent as MeasurementChildPresenter;
  }
}
