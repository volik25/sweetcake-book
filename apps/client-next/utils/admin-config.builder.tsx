import { ImgInput } from '@shared/img-input/ImgInput';
import { ReactElement } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
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

  public addTextControl(name: string, displayName: string): AdminConfigBuilder {
    this.controls.push(new ConfigControl(name, displayName, ControlType.Text));

    return this;
  }

  public addTextAreaControl(
    name: string,
    displayName: string
  ): AdminConfigBuilder {
    this.controls.push(
      new ConfigControl(name, displayName, ControlType.Textarea)
    );

    return this;
  }

  public addImgControl(name: string, displayName: string): AdminConfigBuilder {
    this.controls.push(new ConfigControl(name, displayName, ControlType.Img));

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
      new ConfigControl(name, displayName, ControlType.Select, values, false)
    );

    return this;
  }

  public getResut(): ConfigControl[] {
    return this.controls;
  }
}

export class ConfigControl {
  public value: string;

  constructor(
    public name: string,
    public displayName: string,
    private type: ControlType,
    public options?: CakeComponentEntity[],
    private multi: boolean = false
  ) {}

  public getControl(
    register: UseFormRegister<FieldValues>,
    control: Control<FieldValues, any>
  ): ReactElement {
    switch (this.type) {
      case ControlType.Text: {
        return (
          <input
            defaultValue={this.value}
            className="form-control"
            {...register(this.name)}
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
