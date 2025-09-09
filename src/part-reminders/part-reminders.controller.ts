import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartRemindersService } from './part-reminders.service';
import { CreatePartReminderDto } from './dto/create-part-reminder.dto';
import { UpdatePartReminderDto } from './dto/update-part-reminder.dto';

@Controller('part-reminders')
export class PartRemindersController {
  constructor(private readonly partRemindersService: PartRemindersService) {}

  @Post()
  create(@Body() createPartReminderDto: CreatePartReminderDto) {
    return this.partRemindersService.create(createPartReminderDto);
  }

  @Get()
  findAll() {
    return this.partRemindersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partRemindersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartReminderDto: UpdatePartReminderDto) {
    return this.partRemindersService.update(+id, updatePartReminderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partRemindersService.remove(+id);
  }
}
