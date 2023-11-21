export class UserModel {
  id: number;
  sort: number;
  active: boolean;
  telegramId: string;
  createdAt: Date;
  updatedAt: Date;
  info?: string;
}
