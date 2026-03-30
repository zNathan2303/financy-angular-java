import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static trimRequired(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (typeof value === 'string' && value.trim() === '') {
      return { required: true };
    }

    return null;
  }

  static currency(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) return null;

    const regex = /^\d+([.,]\d+)?$/;

    const isValid = regex.test(value);

    return isValid ? null : { invalidCurrency: true };
  }

  static validDate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) return null;

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) return { invalidDate: true };

    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    const isValid =
      date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

    return isValid ? null : { invalidDate: true };
  }
}
