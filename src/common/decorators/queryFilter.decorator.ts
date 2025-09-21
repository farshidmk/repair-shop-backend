import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  getMetadataArgsStorage,
  LessThan,
  Like,
  MoreThan,
} from 'typeorm';
import { QueryFilterType as QueryFilterType } from '../types/queryFilter';

export const QueryFilter = <T>(entity: T) =>
  createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const filterString = request.query.filter;

    let filter: QueryFilterType<T> = {};
    if (filterString) {
      try {
        filter = JSON.parse(filterString);
      } catch (err) {
        throw new BadRequestException('Invalid filter query');
      }
    }

    const where: FindOptionsWhere<T> = {};
    const order: FindOptionsOrder<T> = {};

    const validColumns = getMetadataArgsStorage()
      .columns.filter((col) => col.target === entity)
      .map((col) => col.propertyName) as Array<keyof T>;

    // WHERE filter
    if (filter?.where) {
      for (const [key, value] of Object.entries(filter.where)) {
        if (!validColumns.includes(key as keyof T)) {
          throw new BadRequestException(`Invalid filter property: ${key}`);
        }
        where[key] = parseCondition(value);
      }
    }
    // ORDER filter
    if (filter?.order) {
      for (const [key, direction] of Object.entries(filter.order)) {
        if (!validColumns.includes(key as keyof T)) {
          throw new BadRequestException(`Invalid order property: ${key}`);
        }
        order[key] =
          String(direction).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      }
    }

    const skip = filter?.skip ? Number(filter.skip) : 0;
    const take = filter?.take ? Number(filter.take) : 10;

    return { where, order, skip, take } as QueryFilterType<T>;
  })();

function parseCondition(value: any) {
  // LoopBack-style: { gt: 18 }, { lt: 30 }, { like: 'John' }
  if (typeof value === 'object' && value !== null) {
    if (value.gt) return MoreThan(value.gt);
    if (value.lt) return LessThan(value.lt);
    if (value.like) return Like(`%${value.like}%`);
  }
  return value;
}
