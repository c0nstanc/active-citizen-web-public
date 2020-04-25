import { FormGroup } from '@angular/forms';

export interface SubmittableWizardStep {
  onSubmit(): void;
  onSave(): void;
  getFormGroup(): FormGroup;
}
