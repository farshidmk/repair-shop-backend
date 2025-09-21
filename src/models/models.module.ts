import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/brands/entities/brand.entity';
import { Car } from 'src/cars/entities/car.entity';
import { Model } from './entities/model.entity';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService],
  imports: [TypeOrmModule.forFeature([Model, Car, Brand])],
})
export class ModelsModule {}
