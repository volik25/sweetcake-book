import { ImgInput } from '@shared/img-input/ImgInput';
import React, { ReactElement, Ref, RefObject, useRef } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RefCallBack,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { CakeComponentEntity } from '@interfaces/cake/entities/component.entity';
import { ReactSelect } from '@shared/react-select/React-select';

enum ControlType {
  Text = 'text',
  Img = 'img',
  Textarea = 'textarea',
  Select = 'select',
  MultiSelect = 'multiselect',
}

export class AdminConfigBuilder {
  private controls: ConfigControl[] = [];

  public addTextControl(
    name: string,
    displayName: string,
    onChange?: (
      value: any,
      setValue: UseFormSetValue<any>,
      allFields: ConfigControl[]
    ) => void
  ): AdminConfigBuilder {
    this.controls.push(
      new ConfigControl(
        name,
        displayName,
        ControlType.Text,
        this.controls,
        undefined,
        false,
        onChange
      )
    );

    return this;
  }

  public addTextAreaControl(
    name: string,
    displayName: string
  ): AdminConfigBuilder {
    this.controls.push(
      new ConfigControl(name, displayName, ControlType.Textarea, this.controls)
    );

    return this;
  }

  public addImgControl(name: string, displayName: string): AdminConfigBuilder {
    this.controls.push(
      new ConfigControl(name, displayName, ControlType.Img, this.controls)
    );

    return this;
  }

  public addMultiSelectControl(
    name: string,
    displayName: string,
    values: any[]
  ): AdminConfigBuilder {
    this.controls.push(
      new ConfigControl(
        name,
        displayName,
        ControlType.MultiSelect,
        this.controls,
        values,
        true
      )
    );

    return this;
  }

  public addSelectControl(
    name: string,
    displayName: string,
    values: any[]
  ): AdminConfigBuilder {
    this.controls.push(
      new ConfigControl(
        name,
        displayName,
        ControlType.Select,
        this.controls,
        values,
        false
      )
    );

    return this;
  }

  public getResut(): ConfigControl[] {
    return this.controls;
  }
}

export class ConfigControl {
  public value: string;
  public ref: RefObject<any> = React.createRef();

  constructor(
    public name: string,
    public displayName: string,
    private type: ControlType,
    private allFields: ConfigControl[],
    public options?: CakeComponentEntity[],
    private multi: boolean = false,
    private onChange?: (
      value: any,
      setValue: UseFormSetValue<any>,
      allFields: ConfigControl[]
    ) => void
  ) {}

  public getControl(
    register: UseFormRegister<FieldValues>,
    control: Control<FieldValues, any>,
    setValue: UseFormSetValue<any>
  ): ReactElement {
    const { onChange, ...reg } = register(this.name);
    switch (this.type) {
      case ControlType.Text: {
        return (
          <input
            defaultValue={this.value}
            className="form-control"
            {...reg}
            onChange={(event) => {
              onChange(event);
              this.onChange &&
                this.onChange(event.target.value, setValue, this.allFields);
            }}
            type="text"
          />
        );
      }
      case ControlType.Textarea: {
        return (
          <textarea
            defaultValue={this.value}
            className="form-control"
            {...register(this.name)}
            rows={3}
          ></textarea>
        );
      }
      case ControlType.Img: {
        return (
          <Controller
            control={control}
            name={this.name}
            defaultValue={{ imgSrc: this.value }}
            render={({ field: { onChange, value } }) => (
              <ImgInput
                className="mb-3"
                onChange={onChange}
                imgSrc={value?.imgSrc}
              />
            )}
          />
        );
      }
      case ControlType.MultiSelect: {
        return (
          <Controller
            control={control}
            name={this.name}
            defaultValue={this.options?.filter((option) =>
              (this.value as unknown as any[]).find(
                (value) => value.id === option.id
              )
            )}
            render={({ field: { onChange, value } }) => (
              <ReactSelect
                defaultOptions={this.options || []}
                defaultValue={value}
                isMulti={this.multi}
                onChange={onChange}
              />
            )}
          />
        );
      }
      default: {
        console.error('Unknown field type');

        return <></>;
      }
    }
  }
}
