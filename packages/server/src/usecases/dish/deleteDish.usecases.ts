import { ILogger } from 'src/domain/logger/logger.interface';
import { DishModel } from 'src/domain/model/dish';
import { DishRepository } from 'src/domain/repositories/dishRepository.interface';

export class deleteDishUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly dishRepository: DishRepository,
  ) {}

  async execute(dishId: number): Promise<DishModel> {
    const result = await this.dishRepository.delete(dishId);
    this.logger.log('deleteDishUseCases execute', `Dish - ${dishId}`);
    return result;
  }
}
