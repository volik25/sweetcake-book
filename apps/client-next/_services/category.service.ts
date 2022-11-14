import { CategoryEntity } from '@interfaces/category/entities/category.entity';
import { UpdateCategoryDto } from '@interfaces/category/dtos/update.category.dto';
import { BaseService } from '@web/_services/_base.service';

export class CategoryService extends BaseService<CategoryEntity, UpdateCategoryDto> {
  serviceUrl = '/category';
}
