import { DishModel } from '../model/dish';

export interface DishRepository {
  findAllForUser(userId: number): Promise<DishModel[]>;
  findByIdForUser(id: number, userId: number): Promise<DishModel>;
  update(dish: Partial<DishModel>): Promise<DishModel>;
  add(dish: Partial<DishModel>): Promise<DishModel>;
  delete(dishId: number): Promise<DishModel>;
}
