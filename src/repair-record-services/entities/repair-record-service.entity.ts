import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Service as ServiceEntity } from 'src/services/entities/service.entity';
import { RepairRecord } from 'src/repair-records/entities/repair-record.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'RepairRecordService' })
export class RepairRecordService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RepairRecord, (rr) => rr.services, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'repair_record_id' })
  repairRecord: RepairRecord;

  @ManyToOne(() => User, (u) => u.repairServicesAsMechanic, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'mechanic_id' })
  mechanic: User;

  @ManyToOne(() => ServiceEntity, (s) => s.repairRecordServices, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity;

  @Column({ name: 'cost', type: 'integer' })
  cost: number;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'service_date', type: 'timestamp' })
  serviceDate: Date;
}
