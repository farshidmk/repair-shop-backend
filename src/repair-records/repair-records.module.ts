import { Module } from '@nestjs/common';
import { RepairRecordsService } from './repair-records.service';
import { RepairRecordsController } from './repair-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepairRecord } from './entities/repair-record.entity';

@Module({
  controllers: [RepairRecordsController],
  providers: [RepairRecordsService],
  imports: [TypeOrmModule.forFeature([RepairRecord])],
})
export class RepairRecordsModule {}
