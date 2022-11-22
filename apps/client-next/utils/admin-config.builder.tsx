import { ImgInput } from '@shared/img-input/ImgInput';
import React, { ReactElement, RefObject } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { ReactSelect } from '@shared/react-select/React-select';
import { ReactSelectOption } from '@shared/react-select/React-select.interface';
import { UploadedFile } from '@shared/img-input/ImgInput.props';

export class AdminConfigBuilder {
  private controls: IConfigControl[] = [];

  public addTextControl(
    name: string,
    displayName: string,
    value?: string,
    onChange?: (props: OnChangeControlProps<string>) => void
  ): AdminConfigBuilder {
    this.controls.push(
      new ConfigTextControl(name, displayName, this.controls, value, onChange)
    );

    return this;
  }

  public addTextAreaControl(
    name: string,
    displayName: string,
    value?: string,
    onChange?: (props: OnChangeControlProps<string>) => void
  ): AdminConfigBuilder {
    this.controls.push(
      new ConfigTextAreaControl(
        name,
        displayName,
        this.controls,
        value,
        onChange
      )
    );

    return this;
  }

  public addImgControl(
    name: string,
    displayName: string,
    value?: UploadedFile,
    onChange?: (props: OnChangeControlProps<UploadedFile>) => void
  ): AdminConfigBuilder {
    this.controls.push(
      new ConfigImgControl(name, displayName, this.controls, value, onChange)
    );

    return this;
  }

  public addMultiSelectControl(
    name: string,
    displayName: string,
    options: ReactSelectOption[],
    value?: ReactSelectOption[],
    onChange?: (props: OnChangeControlProps<ReactSelectOption[]>) => void
  ): AdminConfigBuilder {
    this.controls.push(
      new ConfigMultiSelectControl(
        name,
        displayName,
        options,
        this.controls,
        value,
        onChange
      )
    );

    return this;
  }

  public addSelectControl(
    name: string,
    displayName: string,
    options: ReactSelectOption[],
    value: ReactSelectOption,
    onChange?: (props: OnChangeControlProps<ReactSelectOption>) => void
  ): AdminConfigBuilder {
    this.controls.push(
      new ConfigSelectControl(
        name,
        displayName,
        options,
        this.controls,
        value,
        onChange
      )
    );

    return this;
  }

  public getResut(): IConfigControl[] {
    return this.controls;
  }
}

export interface GetControlProps {
  setValue: UseFormSetValue<any>;
  register?: UseFormRegister<FieldValues>;
  control?: Control<FieldValues, any>;
}

export interface OnChangeControlProps<ValueType> {
  value: ValueType;
  setValue: UseFormSetValue<any>;
  allFields: IConfigControl[];
}

export interface IConfigControl {
  name: string;
  displayName: string;
  ref: RefObject<HTMLDivElement>;
  value?: any;
  getControl: (props: GetControlProps) => ReactElement;
}

export abstract class ConfigControl<ValueType> implements IConfigControl {
  public ref: RefObject<HTMLDivElement> = React.createRef();

  constructor(
    public name: string,
    public displayName: string,
    protected allFields: IConfigControl[],
    public value?: ValueType,
    protected onChange?: (pros: OnChangeControlProps<ValueType>) => void
  ) {}

  public abstract getControl(props: GetControlProps): ReactElement;
}

export class ConfigTextControl extends ConfigControl<string> {
  public getControl({ setValue, register }: GetControlProps): ReactElement {
    if (!register) {
      return <></>;
    }
    const { onChange, ...reg } = register(this.name);
    return (
      <input
        defaultValue={this.value}
        className="form-control"
        {...reg}
        onChange={(event) => {
          onChange(event);
          this.onChange &&
            this.onChange({
              value: event.target.value,
              setValue,
              allFields: this.allFields,
            });
        }}
        type="text"
      />
    );
  }
}

export class ConfigTextAreaControl extends ConfigControl<string> {
  public getControl({ setValue, register }: GetControlProps): ReactElement {
    if (!register) {
      return <></>;
    }
    const { onChange, ...reg } = register(this.name);
    return (
      <textarea
        defaultValue={this.value}
        className="form-control"
        {...reg}
        onChange={(event) => {
          onChange(event);
          this.onChange &&
            this.onChange({
              value: event.target.value,
              setValue,
              allFields: this.allFields,
            });
        }}
        rows={3}
      ></textarea>
    );
  }
}

export class ConfigImgControl extends ConfigControl<UploadedFile> {
  public getControl({ setValue, control }: GetControlProps): ReactElement {
    if (!control) {
      return <></>;
    }
    return (
      <Controller
        control={control}
        name={this.name}
        defaultValue={this.value}
        render={({ field: { onChange, value } }) => (
          <ImgInput
            className="mb-3"
            onChange={(value) => {
              onChange(value);
              this.onChange &&
                this.onChange({
                  value,
                  setValue,
                  allFields: this.allFields,
                });
            }}
            imgSrc={value?.imgSrc}
          />
        )}
      />
    );
  }
}

export class ConfigSelectControl extends ConfigControl<ReactSelectOption> {
  constructor(
    public name: string,
    public displayName: string,
    public options: ReactSelectOption[],
    protected allFields: IConfigControl[],
    public value?: ReactSelectOption,
    protected onChange?: (
      props: OnChangeControlProps<ReactSelectOption>
    ) => void
  ) {
    super(name, displayName, allFields, value, onChange);
  }

  public getControl({ setValue, control }: GetControlProps): ReactElement {
    if (!control) {
      return <></>;
    }
    return (
      <Controller
        control={control}
        name={this.name}
        defaultValue={this.options?.find(
          (option) => this.value?.id === option.id
        )}
        render={({ field: { onChange, value } }) => (
          <ReactSelect
            defaultOptions={this.options || []}
            defaultValue={value}
            isMulti={false}
            onChange={(value) => {
              onChange(value);
              this.onChange &&
                this.onChange({ value, setValue, allFields: this.allFields });
            }}
          />
        )}
      />
    );
  }
}

export class ConfigMultiSelectControl extends ConfigControl<
  ReactSelectOption[]
> {
  constructor(
    public name: string,
    public displayName: string,
    public options: ReactSelectOption[],
    protected allFields: IConfigControl[],
    public value?: ReactSelectOption[],
    protected onChange?: (
      props: OnChangeControlProps<ReactSelectOption[]>
    ) => void
  ) {
    super(name, displayName, allFields, value, onChange);
  }

  public getControl({ setValue, control }: GetControlProps): ReactElement {
    if (!control) {
      return <></>;
    }
    return (
      <Controller
        control={control}
        name={this.name}
        defaultValue={this.options?.filter((option) =>
          this.value?.find((value) => value.id === option.id)
        )}
        render={({ field: { onChange, value } }) => (
          <ReactSelect
            defaultOptions={this.options || []}
            defaultValue={value}
            isMulti={true}
            onChange={(value) => {
              onChange(value);
              this.onChange &&
                this.onChange({ value, setValue, allFields: this.allFields });
            }}
          />
        )}
      />
    );
  }
}
