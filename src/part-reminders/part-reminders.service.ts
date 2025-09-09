import { Injectable } from '@nestjs/common';
import { CreatePartReminderDto } from './dto/create-part-reminder.dto';
import { UpdatePartReminderDto } from './dto/update-part-reminder.dto';

@Injectable()
export class PartRemindersService {
  create(createPartReminderDto: CreatePartReminderDto) {
    return 'This action adds a new partReminder';
  }

  findAll() {
    return `This action returns all partReminders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partReminder`;
  }

  update(id: number, updatePartReminderDto: UpdatePartReminderDto) {
    return `This action updates a #${id} partReminder`;
  }

  remove(id: number) {
    return `This action removes a #${id} partReminder`;
  }
}
