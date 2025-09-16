import { Module } from '@nestjs/common';
import { OtpCodesService } from './otp-codes.service';
import { OtpCodesController } from './otp-codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpCode } from './entities/otp-code.entity';

@Module({
  controllers: [OtpCodesController],
  providers: [OtpCodesService],
  imports: [TypeOrmModule.forFeature([OtpCode])],
})
export class OtpCodesModule {}
