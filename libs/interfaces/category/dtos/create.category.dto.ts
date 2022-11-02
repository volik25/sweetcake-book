import { IsDefined } from 'class-validator';
import { baseDtoMessage } from '../../../const/base-dto-message';

export class CreateCategoryDto {
  @IsDefined(baseDtoMessage)
  name: string;
}
