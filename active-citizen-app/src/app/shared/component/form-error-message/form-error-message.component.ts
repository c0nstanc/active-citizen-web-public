import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';
import { DefaultFormValidatorsTextConfig } from 'src/app/core/common/model/form-validation/default-form-validators-text-config.model';

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss']
})
export class FormErrorMessageComponent<T extends DefaultFormValidatorsTextConfig> {
  @Input()
  control: FormControl | NgModel;

  @Input()
  errorConfig: T;

  constructor() { }

  get errorMessage(): string {
    for (const errorKey in this.control.errors) {
      if (this.isControlInvalid(this.control, errorKey)) {
        const errorMessage = this.getValidationErrorMessage(
          errorKey,
          this.errorConfig
        );
        if (errorMessage) {
          return errorMessage
        }
      }
    }
    return undefined;
  }

  private isControlInvalid(control: NgModel | FormControl, errorKey: PropertyKey): boolean {
    return control.valid === false && control.touched && this.control.errors.hasOwnProperty(errorKey);
  }

  private getValidationErrorMessage(validatorName: string, errorConfig: T): string {
    return errorConfig[validatorName];
  }
}
