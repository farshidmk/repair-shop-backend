import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CarType } from '../entities/model.entity';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(CarType)
  carType: CarType;

  @IsInt()
  brandId: number; // We pass the brand by id, not the full object
}
