import { Module } from '@nestjs/common';
import { CategoryService } from '@sweetcake/api/modules/category/services/category.service';
import { CategoryController } from '@sweetcake/api/modules/category/controllers/category.controller';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
