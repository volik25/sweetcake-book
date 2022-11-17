import { Module } from '@nestjs/common';
import { CategoryService } from '@api/modules/category/services/category.service';
import { CategoryController } from '@api/modules/category/controllers/category.controller';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
