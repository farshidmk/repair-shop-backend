import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import queryStringFilterToTypeOrmObject from 'src/global/queryStringFilter';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandsRepo: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto) {
    const form = this.brandsRepo.create(createBrandDto);
    return this.brandsRepo.save(form);
  }

  findAll(filter: any) {
    const filterObject = queryStringFilterToTypeOrmObject(filter);
    return this.brandsRepo.find(filterObject);
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
