import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  navTo?: string;
  hostStyles?: CSSProperties;
}
