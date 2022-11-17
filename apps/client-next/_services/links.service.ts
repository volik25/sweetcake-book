import { BaseService } from './_base.service';
import { LinkDto } from '@interfaces/links/dtos/link.dto';
import { UpdateLinkDto } from '@interfaces/links/dtos/update-link.dto';

export class LinksService extends BaseService<LinkDto, UpdateLinkDto> {
  serviceUrl = '/links';

  constructor(isServer = false) {
    super(isServer);
  }
}
