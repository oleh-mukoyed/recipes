import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly telegramId: string;

  @ApiProperty({ required: false })
  @IsString()
  readonly info?: string;
}
