import { BadRequestException, Injectable } from '@nestjs/common';
import { logger } from '@sweetcake/interfaces/logger/logger';
import { CategoryEntity } from '@sweetcake/interfaces/category/entities/category.entity';

@Injectable()
export class CategoryService {
  async findOne(id): Promise<CategoryEntity> {
    try {
      return await CategoryEntity.findOneBy({ id });
    } catch (error) {
      logger.error('[CategoryService] findOne: ', error);
      throw new BadRequestException(error.message);
    }
  }
}
