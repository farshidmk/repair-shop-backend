// src/models/models.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Model } from './entities/model.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Brand } from 'src/brands/entities/brand.entity';
import { QueryFilterType } from 'src/common/types/queryFilter';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private modelsRepo: Repository<Model>,

    @InjectRepository(Brand)
    private brandsRepo: Repository<Brand>,
  ) {}

  async create(createModelDto: CreateModelDto) {
    // Check if brand exists
    const brand = await this.brandsRepo.findOneBy({
      id: createModelDto.brandId,
    });
    if (!brand) {
      throw new BadRequestException('برندی با این مشخصات وجود ندارد');
    }

    // Check if model already exists under same brand (case-insensitive)
    const isExist = await this.modelsRepo.findOne({
      where: {
        name: ILike(createModelDto.name),
        brand: { id: createModelDto.brandId },
      },
      relations: ['brand'],
    });

    if (isExist) {
      throw new BadRequestException('مدلی با این نام برای این برند وجود دارد');
    }

    const model = this.modelsRepo.create({
      ...createModelDto,
      brand,
    });

    return this.modelsRepo.save(model);
  }

  async findAll(filter: QueryFilterType<Model>) {
    return await this.modelsRepo.find({
      ...filter,
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const model = await this.modelsRepo.findOne({
      where: { id },
      relations: ['brand', 'cars'],
    });

    if (!model) {
      throw new BadRequestException('مدلی با این مشخصات وجود ندارد');
    }

    return model;
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    const model = await this.findOne(id);

    // If brand is being changed
    let brand: Brand | null = model.brand;
    if (updateModelDto.brandId) {
      brand = await this.brandsRepo.findOneBy({ id: updateModelDto.brandId });
      if (!brand) {
        throw new BadRequestException('برندی با این مشخصات وجود ندارد');
      }
    }

    // If name is being updated, check for duplicates
    if (updateModelDto.name) {
      const isExist = await this.modelsRepo.findOne({
        where: {
          name: ILike(updateModelDto.name),
          brand: { id: brand.id },
        },
        relations: ['brand'],
      });

      if (isExist && isExist.id !== id) {
        throw new BadRequestException(
          'مدلی با این نام برای این برند وجود دارد',
        );
      }
    }

    Object.assign(model, {
      ...updateModelDto,
      brand,
    });

    return this.modelsRepo.save(model);
  }

  async remove(id: number) {
    const model = await this.findOne(id);
    return await this.modelsRepo.remove(model);
  }
}
