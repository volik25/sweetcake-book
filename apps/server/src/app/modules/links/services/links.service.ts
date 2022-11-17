import { Injectable } from '@nestjs/common';
import { LinkEntity } from '@interfaces/links/entities/link.entity';
import { baseException } from '@api/core/base-exception';
import { UpdateLinkDto } from '@interfaces/links/dtos/update-link.dto';
import { CreateLinkDto } from '@interfaces/links/dtos/create-link.dto';
import { LinkDto } from '@interfaces/links/dtos/link.dto';
import { FilesService } from '@api/modules/files/files.service';

@Injectable()
export class LinksService {
  constructor(private filesService: FilesService) {}
  async find(): Promise<LinkDto[]> {
    try {
      return (await LinkEntity.find()).map((q) => this.mapToLinkDto(q));
    } catch (error) {
      baseException('[LinksService] find: ', error);
    }
  }

  async findOne(id: number): Promise<LinkEntity> {
    try {
      return await LinkEntity.findOne({ where: { id } });
    } catch (error) {
      baseException('[LinksService] findOne: ', error);
    }
  }

  async create(link: CreateLinkDto): Promise<LinkDto> {
    try {
      return this.mapToLinkDto(await LinkEntity.create({ ...link }).save());
    } catch (error) {
      baseException('[LinksService] create: ', error);
    }
  }

  async update(id, body: UpdateLinkDto) {
    try {
      const cur = await this.findOne(id);
      if (!cur) {
        return;
      }
      if (cur.img !== body.img) {
        await this.filesService.remove(cur.img);
      }
      await LinkEntity.update({ id }, body);
      return {};
    } catch (error) {
      baseException('[LinksService] update: ', error);
    }
  }

  async delete(id) {
    try {
      const cur = await this.findOne(id);
      if (!cur) {
        return;
      }
      await this.filesService.remove(cur.img);
      await LinkEntity.delete(id);
      return {};
    } catch (error) {
      baseException('[LinksService] delete: ', error);
    }
  }

  mapToLinkDto(entity: LinkEntity): LinkDto {
    return {
      id: entity.id,
      img: entity.img,
      name: entity.name,
      link: entity.link,
    };
  }
}
