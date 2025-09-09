import { RepairRecordService } from 'src/repair-record-services/entities/repair-record-service.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'Service' })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @ManyToOne(() => User, (u) => u.servicesCreated, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ name: 'default_cost', type: 'integer', nullable: true })
  defaultCost?: number;

  @OneToMany(() => RepairRecordService, (rrs) => rrs.service)
  repairRecordServices: RepairRecordService[];
}
