import { Body, Controller, Get, Post, Req, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginByOtpDto, LoginByPasswordDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body);
    const { password, ...result } = user;
    return result;
  }

  @Post('login-by-password')
  async loginByPassword(
    @Body() { password, phoneNumber }: LoginByPasswordDto,
    @Session() session: any,
  ) {
    const user = await this.authService.loginByPassword(phoneNumber, password);
  }
  @Post('login-by-otp')
  async loginByOTP(@Body() { password, phoneNumber }: LoginByOtpDto) {
    return this.authService.login(phoneNumber, password);
  }

  @Get()
  findAll(@Req() request: Request) {
    console.log(request); // or "request.cookies['cookieKey']"
    // or console.log(request.signedCookies);
  }
}
