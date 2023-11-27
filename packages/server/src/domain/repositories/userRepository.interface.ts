import { UserModel } from '../model/user';

export interface UserRepository {
  insertOrUpdate(dish: UserModel): Promise<UserModel>;
  getByTelegramId(telegramId: string): Promise<UserModel>;
}
