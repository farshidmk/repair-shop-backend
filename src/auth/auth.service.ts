import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async loginByPassword(phoneNumber: string, password: string): Promise<any> {
    const user = await this.usersService.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return user;
  }

  async login(phoneNumber: string, password: string): Promise<any> {}

  async signUp(userInfo: CreateUserDto): Promise<User> {
    const isPhoneNumberInUse = Boolean(
      await this.usersService.findByPhoneNumber(userInfo.phoneNumber!),
    );
    if (isPhoneNumberInUse) {
      throw new BadRequestException('phone number is in use');
    }
    const salt = await bcrypt.genSalt(10); // generate valid salt
    const hashedPassword = await bcrypt.hash(userInfo.password, salt);
    const newUser = await this.usersService.create({
      ...userInfo,
      password: hashedPassword,
    });
    return newUser;
  }
}
