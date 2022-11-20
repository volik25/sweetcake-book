import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '@api/guards/jwt.guard';
import { StaticService } from '../services/static.service';
import { HeaderDto } from '@interfaces/static/dtos/header.dto';
import { UpdateHeaderDto } from '@interfaces/static/dtos/update-header.dto';

@Controller('api/static')
export class StaticController {
  constructor(private questionsService: StaticService) {}

  @Get('header')
  async getHeader(): Promise<Partial<HeaderDto>> {
    return await this.questionsService.getHeader();
  }

  @Put('header')
  @UseGuards(JwtGuard)
  async updateHeader(@Body() body: UpdateHeaderDto): Promise<unknown> {
    return await this.questionsService.updateHeader(body);
  }
}
