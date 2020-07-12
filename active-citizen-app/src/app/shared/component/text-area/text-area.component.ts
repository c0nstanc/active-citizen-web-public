import { Component, OnInit, Input, Self, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DefaultFormValidatorsConfig } from 'src/app/core/model/form-validation/default-form-validators-config.model';
import { FormGroup, NgControl, FormBuilder, DefaultValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent<T extends DefaultFormValidatorsConfig> extends DefaultValueAccessor implements OnInit {

  @Input()
  label: string;

  @Input()
  placeholder: string;

  @Input()
  errorConfig: T;

  @ViewChild('textArea', { static: true })
  textArea: ElementRef;

  formGroup: FormGroup;

  isDisabled: boolean;

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    @Self() public controlDir: NgControl,
    private formBuilder: FormBuilder,
  ) {
    super(renderer, elementRef, false);
    controlDir.valueAccessor = this;

  }

  writeValue(value: string): void {
    this.textArea.nativeElement.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;

  }

  setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
  }

  ngOnInit(): void {
    const validators = this.controlDir.control.validator ?
      [this.controlDir.control.validator] : [];
    this.controlDir.control.setValidators(validators);
    this.formGroup = this.formBuilder.group({
      textArea: this.controlDir.control
    });
  }

}
