import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PillBtnProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  img?: string;
  smImg?: boolean;
  showEdit?: boolean;
  disabled?: boolean;
  onEdit?: () => void;
  onRemove?: () => void;
}
