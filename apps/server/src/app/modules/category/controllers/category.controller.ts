import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from '@sweetcake/api/modules/category/services/category.service';
import { CategoryEntity } from '@sweetcake/interfaces/category/entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get(':id')
  async findAll(
    @Param('id', ParseIntPipe) id: number
  ): Promise<CategoryEntity> {
    return await this.categoryService.findOne(id);
  }
}
