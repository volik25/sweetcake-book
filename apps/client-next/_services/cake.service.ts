import { BaseService } from '@web/_services/_base.service';
import { CakeEntity } from '@interfaces/cake/entities/cake.entity';
import { UpdateCakeDto } from '@interfaces/cake/dtos/update.cake.dto';
import axios from 'axios';
import { CakeComponentEntity } from '@interfaces/cake/entities/component.entity';
import { CreateComponentDto } from '@interfaces/cake/dtos/create.component.dto';

export class CakeService extends BaseService<CakeEntity, UpdateCakeDto> {
  serviceUrl = '/cake';

  constructor(isServer = false) {
    super(isServer);
  }

  findComponents(): Promise<CakeComponentEntity[]> {
    return axios
      .get<CakeComponentEntity[]>(this.host + this.serviceUrl + '/components', {
        headers: this.headers,
      })
      .then(({ data }) => data);
  }

  createComponent(component: CreateComponentDto): Promise<CakeComponentEntity> {
    return axios
      .post<CakeComponentEntity>(
        this.host + this.serviceUrl + '/components',
        component,
        {
          headers: this.headers,
        }
      )
      .then(({ data }) => data);
  }
}
