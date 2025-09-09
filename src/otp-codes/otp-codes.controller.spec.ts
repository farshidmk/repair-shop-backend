import { Test, TestingModule } from '@nestjs/testing';
import { OtpCodesController } from './otp-codes.controller';
import { OtpCodesService } from './otp-codes.service';

describe('OtpCodesController', () => {
  let controller: OtpCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpCodesController],
      providers: [OtpCodesService],
    }).compile();

    controller = module.get<OtpCodesController>(OtpCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
