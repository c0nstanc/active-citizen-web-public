import { FormGroup } from '@angular/forms';

export interface SubmittableWizardStep {
  onSubmit(): void;
  getFormGroup(): FormGroup;
}
