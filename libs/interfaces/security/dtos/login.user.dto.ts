import { IsDefined } from 'class-validator';
import { baseDtoMessage } from '../../../constants/base-dto-message';

export class UserLoginDTO {
  @IsDefined(baseDtoMessage)
  password: string;
  @IsDefined(baseDtoMessage)
  email: string;
}
