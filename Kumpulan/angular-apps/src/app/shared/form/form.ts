import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form.html',
  styleUrls: ['./form.scss'],
})
export class Form {
  @Output() formSubmit = new EventEmitter<any>();

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
    date: new FormControl('',[Validators.required, minDateValidator])
  });

  submit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.formSubmit.emit(formData);
      this.userForm.reset();
    }
  }
}
function minDateValidator(control: AbstractControl) : ValidationErrors | null{
const selectedDate = new Date(control.value);
const today = new Date();
today.setHours(0, 0, 0, 0);

return selectedDate < today ? { minDate: true } : null;
}
