import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '@api/modules/category/services/category.service';
import { CategoryEntity } from '@interfaces/category/entities/category.entity';
import { CreateCategoryDto } from '@interfaces/category/dtos/create.category.dto';
import { UpdateCategoryDto } from '@interfaces/category/dtos/update.category.dto';
import { JwtGuard } from '@api/guards/jwt.guard';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryService.find();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<CategoryEntity> {
    return await this.categoryService.findOne(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() body: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.categoryService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryDto
  ): Promise<unknown> {
    return await this.categoryService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.categoryService.delete(id);
  }
}
