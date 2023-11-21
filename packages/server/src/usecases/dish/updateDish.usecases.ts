import { ILogger } from 'src/domain/logger/logger.interface';
import { DishModel } from 'src/domain/model/dish';
import { DishRepository } from 'src/domain/repositories/dishRepository.interface';

export class updateDishUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly dishRepository: DishRepository,
  ) {}

  async execute(dish: Partial<DishModel>): Promise<DishModel> {
    const result = await this.dishRepository.update(dish);
    this.logger.log('updateDishUseCases execute', `Dish - ${dish.id}`);
    return result;
  }
}
