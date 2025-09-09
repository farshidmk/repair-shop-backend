import { PartialType } from '@nestjs/swagger';
import { CreatePartReminderDto } from './create-part-reminder.dto';

export class UpdatePartReminderDto extends PartialType(CreatePartReminderDto) {}
