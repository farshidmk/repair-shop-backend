import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepairRecordServicesService } from './repair-record-services.service';
import { CreateRepairRecordServiceDto } from './dto/create-repair-record-service.dto';
import { UpdateRepairRecordServiceDto } from './dto/update-repair-record-service.dto';

@Controller('repair-record-services')
export class RepairRecordServicesController {
  constructor(private readonly repairRecordServicesService: RepairRecordServicesService) {}

  @Post()
  create(@Body() createRepairRecordServiceDto: CreateRepairRecordServiceDto) {
    return this.repairRecordServicesService.create(createRepairRecordServiceDto);
  }

  @Get()
  findAll() {
    return this.repairRecordServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repairRecordServicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepairRecordServiceDto: UpdateRepairRecordServiceDto) {
    return this.repairRecordServicesService.update(+id, updateRepairRecordServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repairRecordServicesService.remove(+id);
  }
}
