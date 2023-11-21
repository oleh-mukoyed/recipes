import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import {
  AddIngredientDto,
  UpdateIngredientDto,
} from '../ingredient/ingredient.dto';

export class UpdateDishDto {
  @ApiProperty({ required: true, minimum: 0 })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    maxDecimalPlaces: 0,
    allowInfinity: false,
  })
  @IsPositive()
  readonly id: number;

  @ApiProperty({ required: true, maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @ApiProperty({ required: false, maxLength: 3000 })
  @IsString()
  @MaxLength(3000)
  readonly notes?: string;

  @ApiProperty({ required: true, type: [UpdateIngredientDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  readonly ingredients: Array<UpdateIngredientDto>;
}

export class AddDishDto {
  @ApiProperty({ required: true, minimum: 0 })
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
    maxDecimalPlaces: 0,
    allowInfinity: false,
  })
  @IsPositive()
  readonly userId: number;

  @ApiProperty({ required: true, maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @ApiProperty({ required: false, maxLength: 3000 })
  @IsString()
  @MaxLength(3000)
  readonly notes?: string;

  @ApiProperty({ required: true, type: [AddIngredientDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  readonly ingredients: Array<AddIngredientDto>;
}
