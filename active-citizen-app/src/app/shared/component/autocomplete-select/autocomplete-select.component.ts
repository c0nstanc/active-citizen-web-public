import { Component, OnInit, Renderer2, ElementRef, Input, Self, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SelectControlValueAccessor, NgControl, FormGroup, FormBuilder } from '@angular/forms';
import { DropDownItem } from 'src/app/core/common/model/menu/drop-down-item.model';
import { startWith, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { DefaultFormValidatorsTextConfig } from 'src/app/core/common/model/form-validation/default-form-validators-text-config.model';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-autocomplete-select',
  templateUrl: './autocomplete-select.component.html',
  styleUrls: ['./autocomplete-select.component.scss']
})
export class AutocompleteSelectComponent<T extends DefaultFormValidatorsTextConfig>
  extends SelectControlValueAccessor implements OnInit, OnDestroy {

  @Input()
  label: string;

  @Input()
  errorConfig: T;

  @Input()
  dropDownItems: DropDownItem[]

  @Output()
  optionSelected = new EventEmitter<DropDownItem>();

  @ViewChild('input', { static: true })
  input: ElementRef;

  formGroup: FormGroup;
  filteredDropDownItems: Observable<DropDownItem[]>
  subs: SubSink = new SubSink();

  constructor(
    @Self() public controlDir: NgControl,
    private formBuilder: FormBuilder,
    renderer: Renderer2,
    _elementRef: ElementRef) {
    super(renderer, _elementRef);
    controlDir.valueAccessor = this;
  }


  propagateChange = (_: any) => { };


  writeValue(value: DropDownItem): void {
    if (value){
      this.input.nativeElement.value = value;
    }
  }

  onOptionSelected(selectedDropDownItem: DropDownItem) {
    this.optionSelected.emit(selectedDropDownItem)
  }

  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
  }


  displayInput(dropDownItem: DropDownItem): string {
    return dropDownItem.translatedName;
  }

  ngOnInit(): void {
    this.subs.sink = this.controlDir.control.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value instanceof DropDownItem) {
          return value.translatedName
        } else {
          return value;
        }
      }), map(value => this._filter(value)),
    ).subscribe(values => {
      this.filteredDropDownItems = of(values);
    });

    const validators = this.controlDir.control.validator ?
      [this.controlDir.control.validator] : [];
    this.controlDir.control.setValidators(validators);
    this.formGroup = this.formBuilder.group({
      autocompleteSelect: this.controlDir.control
    });
  }

  private _filter(value: string): DropDownItem[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.dropDownItems.filter(dropDownItem => (dropDownItem.translatedName).toLowerCase()
        .includes(filterValue));
    }
    return this.dropDownItems;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
