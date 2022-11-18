import { BadRequestException, Injectable } from '@nestjs/common';
import { CakeEntity } from '@interfaces/cake/entities/cake.entity';
import { logger } from '@interfaces/logger/logger';
import { baseException } from '@api/core/base-exception';
import { CreateCakeDto } from '@interfaces/cake/dtos/create.cake.dto';
import { UpdateCakeDto } from '@interfaces/cake/dtos/update.cake.dto';

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

  async create(cake: CreateCakeDto): Promise<CakeEntity> {
    try {
      return await CakeEntity.create({ ...cake }).save();
    } catch (error) {
      baseException('[CakeService] create: ', error);
    }
  }

  async update(id, body: UpdateCakeDto) {
    try {
      await CakeEntity.save({ ...body, id });
      return {};
    } catch (error) {
      baseException('[CakeService] update: ', error);
    }
  }

  async delete(id) {
    try {
      await CakeEntity.delete(id);
      return {};
    } catch (error) {
      baseException('[CakeService] delete: ', error);
    }
  }
}
