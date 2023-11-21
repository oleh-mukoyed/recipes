import { ApiProperty } from '@nestjs/swagger';
import { IngredientModel } from 'src/domain/model/ingredient';

import { MeasurementPresenter } from '../measurement/measurement.presenter';

export class IngredientPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  sort: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  number: string;
  // @ApiProperty({ required: false })
  // dishId: number;
  // @ApiProperty()
  // createdAt: Date;
  // @ApiProperty()
  // updatedAt: Date;
  // @ApiProperty()
  // measurementId: number;
  @ApiProperty({ type: MeasurementPresenter })
  measurement: MeasurementPresenter;

  constructor(ingredient: IngredientModel) {
    this.id = ingredient.id;
    this.sort = ingredient.sort;
    this.name = ingredient.name;
    this.number = ingredient.number;
    // this.dishId = ingredient.dishId;
    // this.createdAt = ingredient.createdAt;
    // this.updatedAt = ingredient.updatedAt;
    // this.measurementId = ingredient.measurementId;
    this.measurement = ingredient.measurement as MeasurementPresenter;
  }
}
