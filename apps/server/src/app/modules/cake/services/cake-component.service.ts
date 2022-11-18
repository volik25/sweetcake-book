import { BadRequestException, Injectable } from '@nestjs/common';
import { logger } from '@interfaces/logger/logger';
import { CreateCakeDto } from '@interfaces/cake/dtos/create.cake.dto';
import { baseException } from '@api/core/base-exception';
import { UpdateCakeDto } from '@interfaces/cake/dtos/update.cake.dto';
import { CakeComponentEntity } from '@interfaces/cake/entities/component.entity';
import { CreateComponentDto } from '@interfaces/cake/dtos/create.component.dto';

@Injectable()
export class CakeComponentService {
  async find(): Promise<CakeComponentEntity[]> {
    try {
      return await CakeComponentEntity.find();
    } catch (error) {
      logger.error('[CakeComponentService] find: ', error);
      throw new BadRequestException(error.message);
    }
  }

  async create(cake: CreateComponentDto): Promise<CakeComponentEntity> {
    try {
      return await CakeComponentEntity.create({ ...cake }).save();
    } catch (error) {
      baseException('[CakeComponentService] create: ', error);
    }
  }

  async update(id, body: UpdateCakeDto) {
    try {
      await CakeComponentEntity.update({ id }, body);
      return {};
    } catch (error) {
      baseException('[CakeComponentService] update: ', error);
    }
  }

  async delete(id) {
    try {
      await CakeComponentEntity.delete(id);
      return {};
    } catch (error) {
      baseException('[CakeComponentService] delete: ', error);
    }
  }
}
