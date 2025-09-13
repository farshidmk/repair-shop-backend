import { BadRequestException } from '@nestjs/common';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  LessThan,
  Like,
  MoreThan,
} from 'typeorm';

function queryStringFilterToTypeOrmObject<T = any>(filter: any) {
  const where: FindOptionsWhere<T> = {};
  const order: FindOptionsOrder<T> = {};

  // WHERE filter
  if (filter?.where) {
    for (const [key, value] of Object.entries(filter.where)) {
      if (!this.validColumns.includes(key as keyof T)) {
        throw new BadRequestException(`Invalid filter property: ${key}`);
      }
      where[key] = this.parseCondition(value);
    }
  }

  // ORDER filter
  if (filter?.order) {
    for (const [key, direction] of Object.entries(filter.order)) {
      if (!this.validColumns.includes(key as keyof T)) {
        throw new BadRequestException(`Invalid order property: ${key}`);
      }
      order[key] = direction === 'DESC' ? 'DESC' : 'ASC';
    }
  }

  // Pagination
  const skip = filter?.skip ? Number(filter.skip) : 0;
  const take = filter?.limit ? Number(filter.limit) : 10;

  return {
    where,
    order,
    skip,
    take,
  };
}

export default queryStringFilterToTypeOrmObject;

function parseCondition(value: any) {
  // LoopBack-style: { gt: 18 }, { lt: 30 }, { like: 'John' }
  if (typeof value === 'object' && value !== null) {
    if (value.gt) return MoreThan(value.gt);
    if (value.lt) return LessThan(value.lt);
    if (value.like) return Like(`%${value.like}%`);
  }
  return value;
}
