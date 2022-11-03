import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SeparatorProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  img: string;
  hasFading?: boolean;
}
