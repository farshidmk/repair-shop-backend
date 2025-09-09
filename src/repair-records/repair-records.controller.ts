import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepairRecordsService } from './repair-records.service';
import { CreateRepairRecordDto } from './dto/create-repair-record.dto';
import { UpdateRepairRecordDto } from './dto/update-repair-record.dto';

@Controller('repair-records')
export class RepairRecordsController {
  constructor(private readonly repairRecordsService: RepairRecordsService) {}

  @Post()
  create(@Body() createRepairRecordDto: CreateRepairRecordDto) {
    return this.repairRecordsService.create(createRepairRecordDto);
  }

  @Get()
  findAll() {
    return this.repairRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repairRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepairRecordDto: UpdateRepairRecordDto) {
    return this.repairRecordsService.update(+id, updateRepairRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repairRecordsService.remove(+id);
  }
}
