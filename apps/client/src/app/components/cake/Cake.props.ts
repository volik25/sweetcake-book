import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CakeEntity } from '@interfaces/cake/entities/cake.entity';

export interface CakeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cake: CakeEntity;
}
