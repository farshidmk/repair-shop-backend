import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { RepairRecordService } from 'src/repair-record-services/entities/repair-record-service.entity';

@Entity({ name: 'RepairRecord' })
export class RepairRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, (car) => car.repairRecords, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ name: 'entry_date', type: 'timestamp' })
  entryDate: Date;

  @Column({ name: 'exit_date', type: 'timestamp', nullable: true })
  exitDate?: Date;

  @Column({ name: 'mileage', type: 'integer' })
  mileage: number;

  @Column({ name: 'discount', type: 'integer', nullable: true })
  discount?: number;

  @Column({ name: 'total_cost', type: 'integer' })
  totalCost: number;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => RepairRecordService, (r) => r.repairRecord)
  services: RepairRecordService[];
}
