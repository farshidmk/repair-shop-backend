import { Module } from '@nestjs/common';
import { RepairRecordServicesService } from './repair-record-services.service';
import { RepairRecordServicesController } from './repair-record-services.controller';

@Module({
  controllers: [RepairRecordServicesController],
  providers: [RepairRecordServicesService],
})
export class RepairRecordServicesModule {}
