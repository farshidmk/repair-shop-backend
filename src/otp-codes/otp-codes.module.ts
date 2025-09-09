import { Module } from '@nestjs/common';
import { OtpCodesService } from './otp-codes.service';
import { OtpCodesController } from './otp-codes.controller';

@Module({
  controllers: [OtpCodesController],
  providers: [OtpCodesService],
})
export class OtpCodesModule {}
