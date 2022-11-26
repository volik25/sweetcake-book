import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@api/guards/jwt.guard';
import { StaticService } from '../services/static.service';
import { HeaderDto } from '@interfaces/static/dtos/header.dto';
import { UpdateHeaderDto } from '@interfaces/static/dtos/update-header.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/static')
@ApiTags('static')
export class StaticController {
  constructor(private questionsService: StaticService) {}

  @Get('header')
  async getHeader(): Promise<HeaderDto> {
    return await this.questionsService.getHeader();
  }

  @Put('header')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  async updateHeader(@Body() body: UpdateHeaderDto): Promise<unknown> {
    return await this.questionsService.updateHeader(body);
  }
}
