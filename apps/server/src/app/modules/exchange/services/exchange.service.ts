import { Injectable } from '@nestjs/common';
import { LinkEntity } from '@interfaces/links/entities/link.entity';
import { ExchangeRateEntity } from '@interfaces/exchange/entities/exchange.entity';
import { baseException } from '@api/core/base-exception';
import { ExchangeRateDto } from '@interfaces/exchange/dtos/exchange.dto';
import { CreateExchangeRateDto } from '@interfaces/exchange/dtos/create-exchange-rate.dto';
import { CreateLinkDto } from '@interfaces/links/dtos/create-link.dto';
import { LinkDto } from '@interfaces/links/dtos/link.dto';
import { FilesService } from '@api/modules/files/files.service';

@Injectable()
export class ExchangeService {
  async find(): Promise<ExchangeRateDto[]> {
    try {
      return (await ExchangeRateEntity.find()).map((q) => this.mapToLinkDto(q));
    } catch (error) {
      baseException('[LinksService] find: ', error);
    }
  }

  async create(link: CreateExchangeRateDto): Promise<ExchangeRateDto> {
    try {
      return this.mapToLinkDto(
        await ExchangeRateEntity.create({ ...link }).save()
      );
    } catch (error) {
      baseException('[LinksService] create: ', error);
    }
  }

  mapToLinkDto(entity: ExchangeRateEntity): ExchangeRateDto {
    return {
      id: entity.id,
      value: entity.value,
      date: entity.date,
    };
  }
}
