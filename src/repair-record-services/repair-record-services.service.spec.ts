import { Test, TestingModule } from '@nestjs/testing';
import { RepairRecordServicesService } from './repair-record-services.service';

describe('RepairRecordServicesService', () => {
  let service: RepairRecordServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepairRecordServicesService],
    }).compile();

    service = module.get<RepairRecordServicesService>(RepairRecordServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
