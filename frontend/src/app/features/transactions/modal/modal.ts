import { Component, computed, input, output, signal } from '@angular/core';
import {
  Transaction,
  TransactionRequest,
} from '../../../core/services/transactions/transaction-model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { TransactionModalMode } from '../enums/transaction-modal-mode';
import { LucideAngularModule, X, CircleArrowDown, CircleArrowUp } from 'lucide-angular';
import { InputBase } from '../../../shared/components/inputs/input-base/input-base';
import { DateInput } from '../../../shared/components/inputs/date-input/date-input';
import { Category } from '../../../core/services/categories/category-model';
import { SelectInput } from '../../../shared/components/inputs/select-input/select-input';
import { SelectOption } from '../../../shared/components/inputs/select-input/select-option/select-option';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [
    LucideAngularModule,
    InputBase,
    DateInput,
    ReactiveFormsModule,
    SelectInput,
    SelectOption,
    NgClass,
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  readonly X = X;
  readonly CircleArrowDown = CircleArrowDown;
  readonly CircleArrowUp = CircleArrowUp;

  closeModal = output<void>();
  submitEvent = output<Transaction | TransactionRequest>();

  modalState = input<{
    mode: TransactionModalMode;
    transaction?: Transaction;
  }>({
    mode: TransactionModalMode.CREATE,
  });
  submitted = signal(false);
  categoryInvalid = computed(() => {
    return this.submitted() && this.selectedCategory() === null;
  });
  selectedCategoryName = signal<string | null>(null);

  categories = input.required<Category[]>();

  incomeFormControl = new FormControl(false, {
    nonNullable: true,
  });
  descriptionFormControl = new FormControl(
    { value: '', disabled: false },
    {
      validators: [CustomValidators.trimRequired, Validators.maxLength(100)],
      nonNullable: true,
    },
  );
  today: string = new Date().toLocaleDateString('en-CA');
  dateFormControl = new FormControl(
    { value: this.today, disabled: false },
    {
      validators: [Validators.required, CustomValidators.validDate],
      nonNullable: true,
    },
  );
  valueFormControl = new FormControl(
    { value: 0, disabled: false },
    {
      validators: [
        CustomValidators.currency,
        Validators.required,
        Validators.min(0.01),
        Validators.max(999_999.99),
      ],
      nonNullable: true,
    },
  );
  selectedCategory = signal<string | null>(null);

  transactionForm = new FormGroup({
    income: this.incomeFormControl,
    description: this.descriptionFormControl,
    date: this.dateFormControl,
    value: this.valueFormControl,
  });

  constructor() {
    const value = localStorage.getItem('transaction-searched');

    if (!value) return;

    const transactionToUpdate: Transaction = JSON.parse(value);

    this.transactionForm.patchValue({
      income: transactionToUpdate.income,
      date: transactionToUpdate.date,
      description: transactionToUpdate.description,
      value: transactionToUpdate.value,
    });
    this.selectedCategory.set(transactionToUpdate.category.id.toString());
    this.selectedCategoryName.set(transactionToUpdate.category.title);

    this.transactionForm.markAsPristine();
    this.transactionForm.markAsUntouched();
    this.submitted.set(false);
  }

  submit() {
    this.transactionForm.markAllAsTouched();
    this.submitted.set(true);

    if (this.transactionForm.invalid) return;

    const categoryId = this.selectedCategory();

    if (!categoryId) return;

    const { date, description, income, value } = this.transactionForm.getRawValue();

    const descriptionFormatted = description.trim();
    const numberValue = Number(Number(value.toString().replace(',', '.')).toFixed(2));

    const transactionToUpdate = localStorage.getItem('transaction-searched');

    if (transactionToUpdate) {
      const transaction: Transaction = JSON.parse(transactionToUpdate);

      this.submitEvent.emit({
        id: transaction.id,
        description,
        date,
        value: numberValue,
        income: income,
        category: {
          color: '',
          description: '',
          icon: '',
          id: Number(categoryId),
          title: '',
        },
      });
    } else {
      this.submitEvent.emit({
        description: descriptionFormatted,
        date,
        income,
        value: numberValue,
        categoryId: Number(categoryId),
      });
    }
  }

  selectCategory(value: string | null) {
    if (!value) return;

    this.selectedCategory.set(value);

    const category = this.categories().find((c) => c.id.toString() === value);

    this.selectedCategoryName.set(category?.title ?? null);
  }
}
