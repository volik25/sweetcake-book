import { Controller, Get } from '@nestjs/common';
import { CakeEntity } from '@sweetcake/interfaces/cake/entities/cake.entity';
import { CakeService } from '../services/cake.service';

@Controller('cake')
export class CakeController {
  constructor(private cakeService: CakeService) {}

  @Get()
  async findAll(): Promise<CakeEntity[]> {
    return await this.cakeService.find();
  }
}
