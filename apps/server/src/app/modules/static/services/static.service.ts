import { Injectable } from '@nestjs/common';
import { StaticEntity } from '@interfaces/static/entities/static.entity';
import { baseException } from '@api/core/base-exception';
import { HeaderDto } from '@interfaces/static/dtos/header.dto';

@Injectable()
export class StaticService {
  async getHeader(): Promise<Partial<HeaderDto>> {
    try {
      return this.mapToHeaderDto(await StaticEntity.find());
    } catch (error) {
      baseException('[StaticService] getHeader: ', error);
    }
  }

  async updateHeader(body: Partial<HeaderDto>) {
    try {
      Object.keys(body).map(async (key) => {
        const result = await StaticEntity.update(
          { name: key },
          { value: body[key] }
        );

        if (!result.affected) {
          await StaticEntity.create({ name: key, value: body[key] }).save();
        }
      });

      return {};
    } catch (error) {
      baseException('[StaticService] updateHeader: ', error);
    }
  }

  mapToHeaderDto(entities: StaticEntity[]): Partial<HeaderDto> {
    return entities.reduce((prev, cur) => {
      prev[cur.name] = cur.value;
      return prev;
    }, {});
  }
}
