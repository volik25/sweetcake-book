import { CategoryEntity } from '@interfaces/category/entities/category.entity';
import { BaseService } from '@web/_services/_base.service';

export class CategoryService extends BaseService<CategoryEntity> {
  serviceUrl = '/category';
}
