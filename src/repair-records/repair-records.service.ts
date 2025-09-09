import { Injectable } from '@nestjs/common';
import { CreateRepairRecordDto } from './dto/create-repair-record.dto';
import { UpdateRepairRecordDto } from './dto/update-repair-record.dto';

@Injectable()
export class RepairRecordsService {
  create(createRepairRecordDto: CreateRepairRecordDto) {
    return 'This action adds a new repairRecord';
  }

  findAll() {
    return `This action returns all repairRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repairRecord`;
  }

  update(id: number, updateRepairRecordDto: UpdateRepairRecordDto) {
    return `This action updates a #${id} repairRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} repairRecord`;
  }
}
