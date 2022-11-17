import { IsDefined } from 'class-validator';
import { baseDtoMessage } from '../../../constants/base-dto-message';

export class CreateCategoryDto {
  @IsDefined(baseDtoMessage)
  name: string;

  img: string;
}
