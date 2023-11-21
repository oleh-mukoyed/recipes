import { IngredientModel } from './ingredient';
import { UserModel } from './user';

export class DishModel {
  id: number;
  sort: number;
  active: boolean;
  name: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: UserModel;
  ingredients: Array<IngredientModel>;
}
