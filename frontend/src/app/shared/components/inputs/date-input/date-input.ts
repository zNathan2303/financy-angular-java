import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-date-input',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './date-input.html',
  styleUrl: './date-input.css',
})
export class DateInput {
  formControlInput = input.required<FormControl>();
  labelText = input.required<string>();
  fieldName = input.required<string>();

  isFocused = signal(false);
  isDisabled = input(false);
  submitted = input(false);
  errorMessage = input('Campo inválido');

  getStateClasses() {
    return {
      focused: this.isFocused(),
      disabled: this.isDisabled(),
      'contains-text': this.formControlInput().value != '',
    };
  }

  openDatePicker(input: HTMLInputElement) {
    input.focus();

    if (input.showPicker) {
      input.showPicker();
    }
  }

  isInvalid() {
    const control = this.formControlInput();
    return control.invalid && this.submitted();
  }

  gainFocus() {
    this.isFocused.set(true);
  }
}
