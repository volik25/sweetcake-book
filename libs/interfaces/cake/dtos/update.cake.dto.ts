import { IsDefined } from 'class-validator';
import { baseDtoMessage } from '../../../const/base-dto-message';

export class UpdateCakeDto {
  @IsDefined(baseDtoMessage)
  name: string;

  @IsDefined(baseDtoMessage)
  price: string;
}
