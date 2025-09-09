import { Test, TestingModule } from '@nestjs/testing';
import { PartRemindersService } from './part-reminders.service';

describe('PartRemindersService', () => {
  let service: PartRemindersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartRemindersService],
    }).compile();

    service = module.get<PartRemindersService>(PartRemindersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
