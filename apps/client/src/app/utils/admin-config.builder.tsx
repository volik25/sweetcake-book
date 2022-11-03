import { ReactElement } from 'react';

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

  public getControl(value: string): ReactElement {
    switch (this.type) {
      case 'text': {
        return <input defaultValue={value} className="form-control" type="text" />;
      }
      case 'textarea': {
        return (
          <textarea defaultValue={value} className="form-control" rows={3}></textarea>
        );
      }
      default: {
        console.error('Uknown field type');

        return <></>;
      }
    }
  }
}
