import { Brand } from 'src/brands/entities/brand.entity';
import { Model } from 'src/models/entities/model.entity';
import { PartReminder } from 'src/part-reminders/entities/part-reminder.entity';
import { RepairRecord } from 'src/repair-records/entities/repair-record.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'Car' })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @ManyToOne(() => Brand, (brand) => brand.cars, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => Model, (model) => model.cars, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'model_id' })
  model: Model;

  @Column({ name: 'year', type: 'integer' })
  year: number;

  @Column({ name: 'plate_number', type: 'text' })
  plateNumber: string;

  @Column({ name: 'color', type: 'text', nullable: true })
  color?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => RepairRecord, (rr) => rr.car)
  repairRecords: RepairRecord[];

  @OneToMany(() => PartReminder, (pr) => pr.car)
  partReminders: PartReminder[];
}
