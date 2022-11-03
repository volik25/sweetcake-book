import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface TogglePanelProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  onEdit?: () => void;
}
