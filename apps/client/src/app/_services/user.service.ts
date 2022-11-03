import { BaseService } from '@web/_services/_base.service';
import { UserEntity } from '@interfaces/security/entities/user.entity';

export class UserService extends BaseService<UserEntity> {
  serviceUrl = '/user';
}
