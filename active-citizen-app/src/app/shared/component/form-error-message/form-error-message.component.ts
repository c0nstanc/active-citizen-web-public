import { Component, OnInit, Input } from '@angular/core';
import { NgModel, FormControl } from '@angular/forms';
import { DefaultFormValidatorsConfig } from 'src/app/core/model/form-validation/default-form-validators-config.model';

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss']
})
export class FormErrorMessageComponent<T extends DefaultFormValidatorsConfig> implements OnInit {

  @Input()
  id: string;

  @Input()
  control: NgModel | FormControl;

  @Input()
  andDirty = false;

  @Input()
  errorConfig: T;

  @Input()
  errorVariablesConfig: T;

  get errorMessage(): string {
    return this.getConfigValue(this.errorConfig);
  }

  get errorVariable(): any {
    return this.getConfigValue(this.errorVariablesConfig);
  }

  constructor() { }

  ngOnInit(): void {
  }

  private isControlInvalid(control: NgModel | FormControl, errorKey: PropertyKey): boolean {
    return control.invalid === true &&
      (control.touched || (control.dirty && this.andDirty))
      && this.control.errors.hasOwnProperty(errorKey); // TODO - this needs to change to dirty instead of touched.
  }

  private getCofigValue(key: string, config: T): any {
    return config ? config[key] : undefined;
  }

  private getConfigValue(config: T): string {
    for (const errorKey in this.control.errors) {
      if (this.isControlInvalid(this.control, errorKey)) {
        const configValue = this.getCofigValue(
          errorKey,
          config
        );
        if (configValue) {
          return configValue;
        }
      }
    }
    return undefined;
  }

}
