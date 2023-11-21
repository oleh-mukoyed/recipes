import { ILogger } from 'src/domain/logger/logger.interface';
import { DishModel } from 'src/domain/model/dish';
import { DishRepository } from 'src/domain/repositories/dishRepository.interface';

export class getUserDishUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly dishRepository: DishRepository,
  ) {}

  async execute(id: number, userId: number): Promise<DishModel> {
    const result = await this.dishRepository.findByIdForUser(id, userId);
    this.logger.log(
      'getUserDishesUseCases execute',
      `User - ${userId}, dish id - ${result.id}`,
    );

    return result;
  }
}
