import { HeaderDto } from '@interfaces/static/dtos/header.dto';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  headerData: HeaderDto;
}
