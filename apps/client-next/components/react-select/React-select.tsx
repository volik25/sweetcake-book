import { ReactElement, useMemo, useState } from 'react';
import {
  ReactSelectOptionProps,
  ReactSelectProps,
} from '@shared/react-select/React-select.props';
import CreatableSelect from 'react-select/creatable';
import { CakeService } from '@web/_services/cake.service';
import styles from './React-select.module.scss';
import { PencilFill, Trash3Fill } from 'react-bootstrap-icons';

const EditableOption = ({
  innerProps,
  selectOption,
  initValue,
  children,
  onDelete,
  onEdit,
}: ReactSelectOptionProps) => {
  const [value, setValue] = useState(initValue);

  return (
    <div {...innerProps} className={styles.option}>
      <span>{children}</span>
      <div className={styles['option__action']}>
        <span
          className={styles['option__edit']}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            value.name = prompt('Введите новое значение', value.name);
            setValue(value);
            selectOption(value);
            onEdit && onEdit(value);
          }}
        >
          <PencilFill />
        </span>
        <span
          className={styles['option__remove']}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onDelete && onDelete(value.id);
          }}
        >
          <Trash3Fill />
        </span>
      </div>
    </div>
  );
};

export const ReactSelect = ({
  defaultOptions,
  defaultValue,
  isMulti,
  onChange,
  onEditOption,
  onDeleteOption,
}: ReactSelectProps): ReactElement => {
  const cakeService = useMemo(() => new CakeService(true), []);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const handleCreate = async (newComponentName: string) => {
    setIsLoading(true);
    const newOption = await cakeService.createComponent({
      name: newComponentName,
    });
    setIsLoading(false);
    setOptions((prev) => [...prev, newOption]);
    onChange([...defaultValue, newOption]);
  };

  return (
    <CreatableSelect
      components={{
        Option: (props) => (
          <EditableOption
            {...props}
            initValue={(props as any).value}
            onDelete={onDeleteOption}
            onEdit={onEditOption}
          >
            {props.children}
          </EditableOption>
        ),
      }}
      closeMenuOnSelect={!isMulti}
      onChange={onChange}
      defaultValue={defaultValue}
      value={defaultValue}
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      options={options}
      placeholder="Выберите компоненты"
      isMulti={isMulti}
      onCreateOption={handleCreate}
      formatCreateLabel={(value) => `Создать "${value}"`}
      getOptionLabel={(option) => `${option.name || option.label}`}
      getOptionValue={(option) => option}
    />
  );
};
