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
import { JwtGuard } from '@api/guards/jwt.guard';
import { LinkDto } from '@interfaces/links/dtos/link.dto';
import { LinksService } from '../services/links.service';
import { CreateLinkDto } from '@interfaces/links/dtos/create-link.dto';
import { UpdateLinkDto } from '@interfaces/links/dtos/update-link.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/links')
@ApiTags('Link')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Get()
  async findAll(): Promise<LinkDto[]> {
    return await this.linksService.find();
  }

  @Post()
  @ApiBearerAuth('JWT')
  async create(@Body() body: CreateLinkDto): Promise<LinkDto> {
    return await this.linksService.create(body);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateLinkDto
  ): Promise<unknown> {
    return await this.linksService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.linksService.delete(id);
  }
}
