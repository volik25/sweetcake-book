import { CakeComponentEntity } from '@interfaces/cake/entities/component.entity';

export interface ReactSelectProps {
  defaultOptions: CakeComponentEntity[];
  defaultValue: any;
  isMulti: boolean;
  onChange: (data: any) => void;
}
