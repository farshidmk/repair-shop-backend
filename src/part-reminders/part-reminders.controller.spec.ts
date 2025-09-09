import { Test, TestingModule } from '@nestjs/testing';
import { PartRemindersController } from './part-reminders.controller';
import { PartRemindersService } from './part-reminders.service';

describe('PartRemindersController', () => {
  let controller: PartRemindersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartRemindersController],
      providers: [PartRemindersService],
    }).compile();

    controller = module.get<PartRemindersController>(PartRemindersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
