import { IsDefined } from 'class-validator';
import { baseDtoMessage } from '../../../constants/base-dto-message';

export class CreateComponentDto {
  @IsDefined(baseDtoMessage)
  name: string;
}
