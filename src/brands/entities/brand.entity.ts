import { Car } from 'src/cars/entities/car.entity';
import { Model } from 'src/models/entities/model.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'Brand' })
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fa_name', type: 'text' })
  faName: string;

  @Column({ name: 'en_name', type: 'text' })
  enName: string;

  @Column({ name: 'logo_url', type: 'text' })
  logoUrl: string;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];

  @OneToMany(() => Car, (car) => car.brand)
  cars: Car[];
}
