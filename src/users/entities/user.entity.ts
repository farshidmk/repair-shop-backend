import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { Car } from 'src/cars/entities/car.entity';
import { OtpCode } from 'src/otp-codes/entities/otp-code.entity';
import { RepairRecordService } from 'src/repair-record-services/entities/repair-record-service.entity';
import { Service } from 'src/services/entities/service.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  MECHANIC = 'MECHANIC',
  CUSTOMER = 'CUSTOMER',
}

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', type: 'text' })
  fullName: string;

  @Column({ name: 'phone_number', type: 'text', unique: true })
  phoneNumber: string;

  @Column({ name: 'password_hash', type: 'text', nullable: true })
  passwordHash?: string;

  @Column({ name: 'role', type: 'enum', enum: UserRole, enumName: 'role' })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Car, (car) => car.customer)
  cars: Car[];

  @OneToMany(() => RepairRecordService, (rrs) => rrs.mechanic)
  repairServicesAsMechanic: RepairRecordService[];

  @OneToMany(() => Service, (s) => s.createdBy)
  servicesCreated: Service[];

  @OneToMany(() => OtpCode, (otp) => otp.user)
  otpCodes: OtpCode[];
}
