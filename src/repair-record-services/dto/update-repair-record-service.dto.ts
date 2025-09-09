import { PartialType } from '@nestjs/swagger';
import { CreateRepairRecordServiceDto } from './create-repair-record-service.dto';

export class UpdateRepairRecordServiceDto extends PartialType(CreateRepairRecordServiceDto) {}
