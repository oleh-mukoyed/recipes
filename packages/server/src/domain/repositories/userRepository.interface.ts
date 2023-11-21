import { UserModel } from '../model/user';

export interface UserRepository {
  insert(dish: UserModel): Promise<UserModel>;
  getByTelegramId(telegramId: string): Promise<UserModel>;
}
