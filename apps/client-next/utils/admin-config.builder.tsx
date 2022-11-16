import { ReactElement } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { ImgInput } from '../components/img-input/ImgInput';

export class AdminConfigBuilder {
  private controls: ConfigControl[] = [];

  public addTextControl(name: string, displayName: string): AdminConfigBuilder {
    this.controls.push(new ConfigControl(name, displayName, 'text'));

    return this;
  }

  public addTextAreaControl(
    name: string,
    displayName: string
  ): AdminConfigBuilder {
    this.controls.push(new ConfigControl(name, displayName, 'textarea'));

    return this;
  }

  public addImgControl(name: string, displayName: string): AdminConfigBuilder {
    this.controls.push(new ConfigControl(name, displayName, 'img'));

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
    private type: 'text' | 'img' | 'textarea'
  ) {}

  public getControl(
    register: UseFormRegister<FieldValues>,
    control: Control<FieldValues, any>
  ): ReactElement {
    switch (this.type) {
      case 'text': {
        return (
          <input
            defaultValue={this.value}
            className="form-control"
            {...register(this.name)}
            type="text"
          />
        );
      }
      case 'textarea': {
        return (
          <textarea
            defaultValue={this.value}
            className="form-control"
            {...register(this.name)}
            rows={3}
          ></textarea>
        );
      }
      case 'img': {
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
      default: {
        console.error('Uknown field type');

        return <></>;
      }
    }
  }
}
