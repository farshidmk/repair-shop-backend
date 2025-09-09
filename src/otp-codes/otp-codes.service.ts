import { Injectable } from '@nestjs/common';
import { CreateOtpCodeDto } from './dto/create-otp-code.dto';
import { UpdateOtpCodeDto } from './dto/update-otp-code.dto';

@Injectable()
export class OtpCodesService {
  create(createOtpCodeDto: CreateOtpCodeDto) {
    return 'This action adds a new otpCode';
  }

  findAll() {
    return `This action returns all otpCodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otpCode`;
  }

  update(id: number, updateOtpCodeDto: UpdateOtpCodeDto) {
    return `This action updates a #${id} otpCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} otpCode`;
  }
}
