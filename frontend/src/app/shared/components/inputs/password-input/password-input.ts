import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, EyeClosed, Eye, Lock } from 'lucide-angular';

@Component({
  selector: 'app-password-input',
  imports: [ReactiveFormsModule, NgClass, LucideAngularModule],
  templateUrl: './password-input.html',
  styleUrl: './password-input.css',
})
export class PasswordInput {
  readonly EyeClosed = EyeClosed;
  readonly Eye = Eye;
  readonly Lock = Lock;

  formControlPassword = input.required<FormControl>();

  isFocused = signal(false);
  isHidden = signal(true);
  submitted = input.required<boolean>();

  getStateClasses() {
    return {
      error: this.isInvalid(),
      focused: this.isFocused(),
      'contains-text': this.formControlPassword().value != '',
    };
  }

  isInvalid() {
    const control = this.formControlPassword();
    return control.invalid && this.submitted();
  }

  gainFocus() {
    this.isFocused.set(true);
  }

  showPassword() {
    this.isHidden.set(!this.isHidden());
  }
}
