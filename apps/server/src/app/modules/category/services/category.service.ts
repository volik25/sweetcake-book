import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '@interfaces/category/entities/category.entity';
import { baseException } from '@api/core/base-exception';
import { UpdateCategoryDto } from '@interfaces/category/dtos/update.category.dto';
import { CreateCategoryDto } from '@interfaces/category/dtos/create.category.dto';
import { EntityManager } from 'typeorm';
import { FilesService } from '@api/modules/files/files.service';

@Injectable()
export class CategoryService {
  constructor(
    private manager: EntityManager,
    private filesService: FilesService
  ) {}

  async find(): Promise<CategoryEntity[]> {
    try {
      return await CategoryEntity.find();
    } catch (error) {
      baseException('[CategoryService] find: ', error);
    }
  }

  async findOne(id, flat = false): Promise<CategoryEntity> {
    try {
      return await this.manager.findOne(CategoryEntity, {
        where: { id },
        relations: flat ? [] : ['cakes', 'cakes.components'],
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
      const cur = await this.findOne(id);
      if (!cur) {
        return;
      }
      if (cur.img !== body.img) {
        await this.filesService.remove(cur.img);
      }
      await CategoryEntity.update({ id }, body);
      return {};
    } catch (error) {
      baseException('[CategoryService] update: ', error);
    }
  }

  async delete(id) {
    try {
      const cur = await this.findOne(id);
      if (!cur) {
        return;
      }
      await this.filesService.remove(cur.img);
      await CategoryEntity.delete(id);
      return {};
    } catch (error) {
      baseException('[CategoryService] delete: ', error);
    }
  }
}
