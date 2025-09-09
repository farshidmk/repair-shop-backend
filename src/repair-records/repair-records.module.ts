import { Module } from '@nestjs/common';
import { RepairRecordsService } from './repair-records.service';
import { RepairRecordsController } from './repair-records.controller';

@Module({
  controllers: [RepairRecordsController],
  providers: [RepairRecordsService],
})
export class RepairRecordsModule {}
