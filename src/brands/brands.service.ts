import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandsRepo: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const isExist = await this.brandsRepo.findOne({
      where: {
        enName: ILike(createBrandDto.enName),
      },
    });
    if (isExist) {
      throw new BadRequestException('برند با این نام وجود دارد');
    }
    const form = this.brandsRepo.create(createBrandDto);
    return this.brandsRepo.save(form);
  }

  async findAll(filter: any) {
    return await this.brandsRepo.find(filter);
  }

  async findOne(id: number) {
    const brand = await this.brandsRepo.findOneBy({ id });
    if (!brand) {
      throw new BadRequestException('برندی با این مشخصات وجود ندارد');
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.findOne(id);

    // If enName is being updated, check for duplicates (case-insensitive)
    if (updateBrandDto.enName) {
      const isExist = await this.brandsRepo.findOne({
        where: {
          enName: ILike(updateBrandDto.enName),
        },
      });

      if (isExist && isExist.id !== id) {
        throw new BadRequestException('برند با این نام وجود دارد');
      }
    }

    // Merge changes
    Object.assign(brand, updateBrandDto);

    return this.brandsRepo.save(brand);
  }

  async remove(id: number) {
    const brand = await this.findOne(id);
    return await this.brandsRepo.remove(brand);
  }
}
