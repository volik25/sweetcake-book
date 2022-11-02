import { IsDefined } from 'class-validator';
import { baseDtoMessage } from '../../../constants/base-dto-message';

export class UpdateCakeDto {
  @IsDefined(baseDtoMessage)
  name: string;

  @IsDefined(baseDtoMessage)
  price: string;
}
