import { IsNotEmpty, IsString } from 'class-validator';
export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  faName: string;

  @IsString()
  @IsNotEmpty()
  enName: string;

  @IsString()
  logoUrl: string;
}
