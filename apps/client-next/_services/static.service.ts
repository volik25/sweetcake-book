import { BaseService } from './_base.service';
import { HeaderDto } from '@interfaces/static/dtos/header.dto';
import { UpdateHeaderDto } from '@interfaces/static/dtos/update-header.dto';
import axios from 'axios';

export class StaticService extends BaseService<HeaderDto, UpdateHeaderDto> {
  serviceUrl = '/static';

  constructor(isServer = false) {
    super(isServer);
  }

  public getHeader(): Promise<HeaderDto> {
    return axios
      .get<HeaderDto>(this.host + this.serviceUrl + '/header')
      .then(({ data }) => data);
  }

  public updateHeader(model: UpdateHeaderDto): Promise<unknown> {
    return axios
      .put<unknown>(this.host + this.serviceUrl + '/header', model, {
        withCredentials: true,
        headers: this.headers,
      })
      .then(({ data }) => data);
  }
}
