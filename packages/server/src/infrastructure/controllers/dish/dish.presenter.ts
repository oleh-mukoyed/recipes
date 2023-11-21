import { ApiProperty } from '@nestjs/swagger';
import { DishModel } from 'src/domain/model/dish';

import { IngredientPresenter } from '../ingredient/ingredient.presenter';

export class DishPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  sort: number;
  //@ApiProperty()
  //active: boolean;
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false })
  notes: string;
  // @ApiProperty()
  // createdAt: Date;
  // @ApiProperty()
  // updatedAt: Date;
  @ApiProperty()
  userId: number;
  @ApiProperty({ type: [IngredientPresenter] })
  ingredients: Array<IngredientPresenter>;

  constructor(dish: DishModel) {
    this.id = dish.id;
    this.sort = dish.sort;
    // this.active = dish.active;
    this.name = dish.name;
    this.notes = dish.notes;
    // this.createdAt = dish.createdAt;
    // this.updatedAt = dish.updatedAt;
    this.userId = dish.userId;
    this.ingredients = dish.ingredients as Array<IngredientPresenter>;
  }
}
