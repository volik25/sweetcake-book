import { UpdateCategoryDto } from '@interfaces/category/dtos/update.category.dto';
import { CategoryEntity } from '@interfaces/category/entities/category.entity';
import { BaseService } from './_base.service';

export class CategoryService extends BaseService<
  CategoryEntity,
  UpdateCategoryDto
> {
  serviceUrl = '/category';

  constructor(isServer = false) {
    super(isServer);
  }
}
