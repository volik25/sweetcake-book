import { IsDefined } from 'class-validator';
import { baseDtoMessage } from '../../../constants/base-dto-message';

export class CreateCakeDto {
  @IsDefined(baseDtoMessage)
  name: string;

  @IsDefined(baseDtoMessage)
  price: number;

  @IsDefined(baseDtoMessage)
  img: string;

  @IsDefined(baseDtoMessage)
  weight: number;

  @IsDefined(baseDtoMessage)
  categoryId: number;
}
