
import { UserEntity } from '@interfaces/security/entities/user.entity';
import axios from 'axios';
import { CreateUserDTO } from '@interfaces/security/dtos/create.user.dto';
import { BaseService } from './_base.service';

export class UserService extends BaseService<UserEntity, any> {
  serviceUrl = '/user';

  login(userData: CreateUserDTO): Promise<{ user: UserEntity; token: string }> {
    return axios
      .post<{ user: UserEntity; token: string }>(
        this.host + this.serviceUrl + '/login',
        userData
      )
      .then(({ data }) => {
        this.setToken(data.token);
        return data;
      });
  }

  check(): Promise<UserEntity> {
    return axios
      .get<UserEntity>(this.host + this.serviceUrl + '/check', {
        headers: this.headers,
      })
      .then(({ data }) => data);
  }

  logout(): Promise<any> {
    return axios
      .get(this.host + this.serviceUrl + '/logout', {
        headers: this.headers,
      })
      .then(({ data }) => {
        this.removeToken();
        return data;
      });
  }
}
