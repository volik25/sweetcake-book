import { Controller, Get } from '@nestjs/common';
import { CakeService } from '../services/cake.service';
import { CakeEntity } from '@interfaces/cake/entities/cake.entity';

@Controller('cake')
export class CakeController {
  constructor(private cakeService: CakeService) {}

  @Get()
  async findAll(): Promise<CakeEntity[]> {
    return await this.cakeService.find();
  }
}
