import { IsDefined } from 'class-validator';
import { baseDtoMessage } from '../../../const/base-dto-message';

export class CreateUserDTO {
  @IsDefined(baseDtoMessage)
  password: string;
}
