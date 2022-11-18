import { ReactElement, useEffect, useMemo, useState } from 'react';
import { ReactSelectProps } from '@shared/react-select/React-select.props';
import CreatableSelect from 'react-select/creatable';
import { CakeService } from '@web/_services/cake.service';

export const ReactSelect = ({
  defaultOptions,
  defaultValue,
  isMulti,
  onChange,
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

  useEffect(() => {
    console.log(defaultValue);
  }, [defaultValue]);

  return (
    <CreatableSelect
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
