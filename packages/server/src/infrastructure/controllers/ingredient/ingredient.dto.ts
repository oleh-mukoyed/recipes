import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateIngredientDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    maxDecimalPlaces: 0,
    allowInfinity: false,
  })
  readonly id: number;

  @ApiProperty({ required: true, maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @ApiProperty({ required: true, minimum: 0, format: '0.00' })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    maxDecimalPlaces: 2,
    allowInfinity: false,
  })
  @IsPositive()
  //this field is number in db
  readonly number: string;

  @ApiProperty({ required: true, minimum: 0 })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    maxDecimalPlaces: 0,
    allowInfinity: false,
  })
  @IsPositive()
  readonly measurementId: number;
}

export class AddIngredientDto {
  @ApiProperty({ required: true, maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @ApiProperty({ required: true, minimum: 0, format: '0.00' })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    maxDecimalPlaces: 2,
    allowInfinity: false,
  })
  @IsPositive()
  //this field is number in db
  readonly number: string;

  @ApiProperty({ required: true, minimum: 0 })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    maxDecimalPlaces: 0,
    allowInfinity: false,
  })
  @IsPositive()
  readonly measurementId: number;
}
