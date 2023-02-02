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
import { ExchangeService } from '../services/exchange.service';
import { CreateLinkDto } from '@interfaces/links/dtos/create-link.dto';
import { UpdateLinkDto } from '@interfaces/links/dtos/update-link.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExchangeRateDto } from '@interfaces/exchange/dtos/exchange.dto';
import { CreateExchangeRateDto } from '@interfaces/exchange/dtos/create-exchange-rate.dto';

@Controller('api/exchange')
@ApiTags('Exchange')
export class ExchangeController {
  constructor(private linksService: ExchangeService) {}

  @Get()
  async findAll(): Promise<ExchangeRateDto[]> {
    return await this.linksService.find();
  }

  @Post()
  async create(@Body() body: CreateExchangeRateDto): Promise<ExchangeRateDto> {
    return await this.linksService.create(body);
  }
}
