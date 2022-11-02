import { Module } from '@nestjs/common';
import { CategoryService } from '@api/modules/category/services/category.service';
import { CategoryController } from '@api/modules/category/controllers/category.controller';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
