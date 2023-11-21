import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/domain/model/user';

export class UserPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  sort: number;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  telegramId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({ required: false })
  info: string;

  constructor(user: UserModel) {
    this.id = user.id;
    this.sort = user.sort;
    this.active = user.active;
    this.telegramId = user.telegramId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.info = user.info;
  }
}
