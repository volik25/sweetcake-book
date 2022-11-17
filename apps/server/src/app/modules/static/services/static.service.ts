import { Injectable } from '@nestjs/common';
import { StaticEntity } from '@interfaces/static/entities/static.entity';
import { baseException } from '@api/core/base-exception';
import { HeaderDto } from '@interfaces/static/dtos/header.dto';
import { FilesService } from '@api/modules/files/files.service';

@Injectable()
export class StaticService {
  constructor(private filesService: FilesService) {}
  async getHeader(): Promise<Partial<HeaderDto>> {
    try {
      return this.mapToHeaderDto(await StaticEntity.find());
    } catch (error) {
      baseException('[StaticService] getHeader: ', error);
    }
  }

  async updateHeader(body: Partial<HeaderDto>) {
    try {
      const cur = await this.getHeader();
      Object.keys(body).map(async (key) => {
        if (key === 'logo' && body[key] !== cur.logo) {
          await this.filesService.remove(cur.logo);
        }
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
