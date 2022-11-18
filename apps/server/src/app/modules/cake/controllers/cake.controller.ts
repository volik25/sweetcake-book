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
import { CakeService } from '../services/cake.service';
import { CakeEntity } from '@interfaces/cake/entities/cake.entity';
import { JwtGuard } from '@api/guards/jwt.guard';
import { CreateCakeDto } from '@interfaces/cake/dtos/create.cake.dto';
import { UpdateCakeDto } from '@interfaces/cake/dtos/update.cake.dto';
import { CakeComponentService } from '@api/modules/cake/services/cake-component.service';
import { CakeComponentEntity } from '@interfaces/cake/entities/component.entity';
import { CreateComponentDto } from '@interfaces/cake/dtos/create.component.dto';

@Controller('cake')
export class CakeController {
  constructor(
    private cakeService: CakeService,
    private cakeComponentService: CakeComponentService
  ) {}

  @Get()
  async findAll(): Promise<CakeEntity[]> {
    return await this.cakeService.find();
  }

  @Get('components')
  async findComponents(): Promise<CakeComponentEntity[]> {
    return await this.cakeComponentService.find();
  }

  @Post('components')
  async createComponent(
    @Body() body: CreateComponentDto
  ): Promise<CakeComponentEntity> {
    return await this.cakeComponentService.create(body);
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() body: CreateCakeDto): Promise<CakeEntity> {
    return await this.cakeService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCakeDto
  ): Promise<unknown> {
    return await this.cakeService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.cakeService.delete(id);
  }
}
