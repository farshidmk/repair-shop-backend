import { PartialType } from '@nestjs/swagger';
import { CreateOtpCodeDto } from './create-otp-code.dto';

export class UpdateOtpCodeDto extends PartialType(CreateOtpCodeDto) {}
