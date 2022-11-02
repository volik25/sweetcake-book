import { BadRequestException, Injectable } from '@nestjs/common';
import { CakeEntity } from '@interfaces/cake/entities/cake.entity';
import { logger } from '@interfaces/logger/logger';

@Injectable()
export class CakeService {
  async find(): Promise<CakeEntity[]> {
    try {
      return await CakeEntity.find();
    } catch (error) {
      logger.error('[CakeService] find: ', error);
      throw new BadRequestException(error.message);
    }
  }
}
