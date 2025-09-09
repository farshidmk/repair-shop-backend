import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'OtpCode' })
export class OtpCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'phone_number', type: 'text' })
  phoneNumber: string;

  @Column({ name: 'code', type: 'text' })
  code: string;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expiresAt: Date;

  @Column({ name: 'used', type: 'boolean', default: false })
  used: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  // Relation to User by phone_number:
  @ManyToOne(() => User, (user) => user.otpCodes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'phone_number', referencedColumnName: 'phoneNumber' })
  user: User;
}
