import { ILogger } from 'src/domain/logger/logger.interface';
import { UserModel } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';

export class addOrUpdateUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(telegramId: string, info?: string): Promise<UserModel> {
    const user = new UserModel();
    user.telegramId = telegramId;
    if (info) user.info = info;

    const result = await this.userRepository.insertOrUpdate(user);
    this.logger.log('addOrUpdateUserUseCases execute', `User - ${result.id}`);

    return result;
  }
}
