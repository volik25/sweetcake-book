import { IsDefined } from 'class-validator';
import { baseDtoMessage } from '../../../constants/base-dto-message';

export class UpdateCategoryDto {
  @IsDefined(baseDtoMessage)
  name: string;

  img: string;
}
