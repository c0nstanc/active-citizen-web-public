import { Injectable } from '@angular/core';
import * as clone from 'clone';
import { List, fromJS } from 'immutable';
import { AbstractControl, FormControl, FormGroup, FormArray } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ClonerUtils {

  public  static deepClone<T>(value: any): T {
    return clone<T>(value);
  }

  public static cloneArray<T>(values: any): Array<T> {
    return List<T>(values).toArray();
  }

  public static cloneObject<T>(object: any): T {
    return fromJS(object).toJS() as T;
  }

  public static cloneFormGroup<T>(object: any): T {
    return cloneAbstractControl(object);
  }
}

function cloneAbstractControl<T extends AbstractControl>(control: T): T {
  let newControl: T;

  if (control instanceof FormGroup) {
    const formGroup = new FormGroup({}, control.validator, control.asyncValidator);
    const controls = control.controls;

    Object.keys(controls).forEach(key => {
      formGroup.addControl(key, cloneAbstractControl(controls[key]));
    });

    newControl = formGroup as any;
  } else if (control instanceof FormArray) {
    const formArray = new FormArray([], control.validator, control.asyncValidator);

    control.controls.forEach(
      formControl => {
        formArray.push(cloneAbstractControl(formControl));
      }
    );

    newControl = formArray as any;
  } else if (control instanceof FormControl) {
    newControl = new FormControl(control.value, control.validator, control.asyncValidator) as any;
  } else {
    throw new Error('Error: Unexpected control value');
  }

  if (control.disabled) {
    newControl.disable({ emitEvent: false });
  }

  return newControl;

}
