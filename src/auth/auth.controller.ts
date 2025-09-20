import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginByOtpDto, LoginByPasswordDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body);
    const { password, ...result } = user;
    return result;
  }

  @Post('login-by-password')
  async loginByPassword(
    @Body() { password, phoneNumber }: LoginByPasswordDto,
    @Res() res: Response,
  ) {
    const user = (await this.authService.loginByPassword(
      phoneNumber,
      password,
    )) as User;
    const { password: userPass, createdAt, ...rest } = user;
    const token = this.jwtService.sign({ rest, sub: user.id });
    res.cookie('token', token, {
      httpOnly: true, // not accessible by JS
      secure: false, // set true if using HTTPS
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour (same as JWT expiresIn)
    });
    return res.json({
      message: 'Login successful',
      user: rest,
    });
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
