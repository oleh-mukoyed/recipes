import { ILogger } from 'src/domain/logger/logger.interface';
import { DishModel } from 'src/domain/model/dish';
import { DishRepository } from 'src/domain/repositories/dishRepository.interface';

export class getUserDishesUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly dishRepository: DishRepository,
  ) {}

  async execute(userId: number): Promise<DishModel[]> {
    const result = await this.dishRepository.findAllForUser(userId);
    this.logger.log(
      'getUserDishesUseCases execute',
      `User - ${userId}, count - ${result.length}`,
    );

    return result;
  }
}
