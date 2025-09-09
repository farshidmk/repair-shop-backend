import { Test, TestingModule } from '@nestjs/testing';
import { RepairRecordServicesController } from './repair-record-services.controller';
import { RepairRecordServicesService } from './repair-record-services.service';

describe('RepairRecordServicesController', () => {
  let controller: RepairRecordServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairRecordServicesController],
      providers: [RepairRecordServicesService],
    }).compile();

    controller = module.get<RepairRecordServicesController>(RepairRecordServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
