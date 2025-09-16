import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/users/entities/user.entity';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @MinLength(6, { message: 'رمز عبور باید حداقل 6 کارکتر داشته باشد' })
  password: string;

  @IsEnum(UserRole)
  @IsOptional() // default role could be CUSTOMER if not provided
  role?: UserRole = UserRole.CUSTOMER;
}
