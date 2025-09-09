import { Brand } from 'src/brands/entities/brand.entity';
import { Car } from 'src/cars/entities/car.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

export enum CarType {
  Sedan = 'SEDAN',
  Hatchback = 'HATCHBACK',
  SUV = 'SUV',
  Pickup = 'PICKUP',
  Coupe = 'COUPE',
  Convertible = 'CONVERTIBLE',
  Van = 'VAN',
  Truck = 'TRUCK',
}
@Entity({ name: 'Model' })
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'text' })
  name: string;

  // store as enum and match Postgres enum name if needed:
  @Column({
    name: 'car_type',
    type: 'enum',
    enum: CarType,
    enumName: 'car_type',
  })
  carType: CarType;

  @ManyToOne(() => Brand, (brand) => brand.models, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => Car, (car) => car.model)
  cars: Car[];
}
