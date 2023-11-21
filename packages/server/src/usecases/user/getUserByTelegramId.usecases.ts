import { ILogger } from 'src/domain/logger/logger.interface';
import { UserModel } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';

export class getUserByTelegramIdUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(telegramId: string): Promise<UserModel> {
    const result = await this.userRepository.getByTelegramId(telegramId);
    this.logger.log(
      'getUserByTelegramIdUseCases execute',
      `getUser - ${result?.id}`,
    );

    return result;
  }
}
