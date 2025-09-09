import { Injectable } from '@nestjs/common';
import { CreateRepairRecordServiceDto } from './dto/create-repair-record-service.dto';
import { UpdateRepairRecordServiceDto } from './dto/update-repair-record-service.dto';

@Injectable()
export class RepairRecordServicesService {
  create(createRepairRecordServiceDto: CreateRepairRecordServiceDto) {
    return 'This action adds a new repairRecordService';
  }

  findAll() {
    return `This action returns all repairRecordServices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repairRecordService`;
  }

  update(id: number, updateRepairRecordServiceDto: UpdateRepairRecordServiceDto) {
    return `This action updates a #${id} repairRecordService`;
  }

  remove(id: number) {
    return `This action removes a #${id} repairRecordService`;
  }
}
