import { Module } from '@nestjs/common';
import { PartRemindersService } from './part-reminders.service';
import { PartRemindersController } from './part-reminders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartReminder } from './entities/part-reminder.entity';

@Module({
  controllers: [PartRemindersController],
  providers: [PartRemindersService],
  imports: [TypeOrmModule.forFeature([PartReminder])],
})
export class PartRemindersModule {}
