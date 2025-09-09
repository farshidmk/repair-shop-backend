import { Module } from '@nestjs/common';
import { PartRemindersService } from './part-reminders.service';
import { PartRemindersController } from './part-reminders.controller';

@Module({
  controllers: [PartRemindersController],
  providers: [PartRemindersService],
})
export class PartRemindersModule {}
