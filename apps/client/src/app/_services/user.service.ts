import { UserEntity } from '@interfaces/security/entities/user.entity';
import { BaseService } from '@web/_services/_base.service';

export class UserService extends BaseService<UserEntity, any> {
  serviceUrl = '/user';
}
