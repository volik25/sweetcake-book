import { ReactSelectOption } from '@shared/react-select/React-select.interface';
import { OptionProps } from 'react-select';

export interface ReactSelectProps {
  defaultOptions: ReactSelectOption[];
  defaultValue: any;
  isMulti: boolean;
  onChange: (data: any) => void;
  onEditOption?: (id: number) => void;
  onDeleteOption?: (id: number) => void;
}

export interface ReactSelectOptionProps extends OptionProps {
  initValue: any;
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
}
