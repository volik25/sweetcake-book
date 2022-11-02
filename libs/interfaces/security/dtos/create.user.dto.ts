import { IsDefined } from 'class-validator';
import { baseDtoMessage } from '../../../constants/base-dto-message';

export class CreateUserDTO {
  @IsDefined(baseDtoMessage)
  password: string;
}
