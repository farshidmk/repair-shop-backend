import { Module } from '@nestjs/common';
import { RepairRecordServicesService } from './repair-record-services.service';
import { RepairRecordServicesController } from './repair-record-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepairRecordService } from './entities/repair-record-service.entity';

@Module({
  controllers: [RepairRecordServicesController],
  providers: [RepairRecordServicesService],
  imports: [TypeOrmModule.forFeature([RepairRecordService])],
})
export class RepairRecordServicesModule {}
