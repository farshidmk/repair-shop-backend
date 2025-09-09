import { Car } from 'src/cars/entities/car.entity';
import { RepairRecordService } from 'src/repair-record-services/entities/repair-record-service.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'PartReminder' })
export class PartReminder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, (c) => c.partReminders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(() => RepairRecordService, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'repair_record_service_id' })
  repairRecordService: RepairRecordService;

  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: string; // YYYY-MM-DD stored as string or Date depending on usage

  @Column({ name: 'expire_mileage', type: 'integer' })
  expireMileage: number;

  @Column({ name: 'notified', type: 'boolean', default: false })
  notified: boolean;

  @Column({ name: 'note', type: 'text', nullable: true })
  note?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
