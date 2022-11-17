import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '@interfaces/category/entities/category.entity';
import { baseException } from '@api/core/base-exception';
import { UpdateCategoryDto } from '@interfaces/category/dtos/update.category.dto';
import { CreateCategoryDto } from '@interfaces/category/dtos/create.category.dto';
import { getDataSource } from '@api/core/data-source';
import { EntityManager } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(private manager: EntityManager) {}

  async find(): Promise<CategoryEntity[]> {
    try {
      return await CategoryEntity.find();
    } catch (error) {
      baseException('[CategoryService] find: ', error);
    }
  }

  async findOne(id): Promise<CategoryEntity> {
    try {
      return await this.manager.findOne(CategoryEntity, {
        where: { id },
        relations: ['cakes', 'cakes.components'],
      });
    } catch (error) {
      baseException('[CategoryService] findOneBy: ', error);
    }
  }

  async create(category: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return await CategoryEntity.create({ ...category }).save();
    } catch (error) {
      baseException('[CategoryService] create: ', error);
    }
  }

  async update(id, body: UpdateCategoryDto) {
    try {
      await CategoryEntity.update({ id }, body);
      return {};
    } catch (error) {
      baseException('[CategoryService] update: ', error);
    }
  }

  async delete(id) {
    try {
      await CategoryEntity.delete(id);
      return {};
    } catch (error) {
      baseException('[CategoryService] delete: ', error);
    }
  }
}
