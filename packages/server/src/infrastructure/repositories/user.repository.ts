import { Injectable } from '@nestjs/common';

import { UserModel } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async insert(user: UserModel): Promise<UserModel> {
    const result = await this.prisma.user.create({ data: user });
    return result as UserModel;
  }

  async getByTelegramId(telegramId: string): Promise<UserModel> {
    const result = await this.prisma.user.findFirst({
      where: { telegramId: telegramId, active: true },
    });
    return result as UserModel;
  }
}
