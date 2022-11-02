import { IsDefined } from 'class-validator';
import { baseDtoMessage } from '../../../const/base-dto-message';

export class UpdateCategoryDto {
  @IsDefined(baseDtoMessage)
  name: string;
}
