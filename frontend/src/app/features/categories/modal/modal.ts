import { Component, input, output, signal } from '@angular/core';
import { InputBase } from '../../../shared/components/inputs/input-base/input-base';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  LucideAngularModule,
  X,
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText,
} from 'lucide-angular';
import { CategoryRequest } from '../../../core/services/categories/category-model';
import { CategoryModalMode } from '../enums/category-modal-mode';
import { CustomValidators } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'app-modal',
  imports: [InputBase, LucideAngularModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  readonly X = X;

  icons = [
    { name: 'briefcasebusiness', icon: BriefcaseBusiness },
    { name: 'carfront', icon: CarFront },
    { name: 'heartpulse', icon: HeartPulse },
    { name: 'piggybank', icon: PiggyBank },
    { name: 'shoppingcart', icon: ShoppingCart },
    { name: 'ticket', icon: Ticket },
    { name: 'toolcase', icon: ToolCase },
    { name: 'utensils', icon: Utensils },
    { name: 'pawprint', icon: PawPrint },
    { name: 'house', icon: House },
    { name: 'gift', icon: Gift },
    { name: 'dumbbell', icon: Dumbbell },
    { name: 'bookopen', icon: BookOpen },
    { name: 'baggageclaim', icon: BaggageClaim },
    { name: 'mailbox', icon: Mailbox },
    { name: 'receipttext', icon: ReceiptText },
  ];
  colors = ['green', 'blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'gray'];

  closeModal = output<void>();
  submitEvent = output<CategoryRequest>();

  modalState = input<{
    mode: CategoryModalMode;
    category?: CategoryRequest;
  }>({
    mode: CategoryModalMode.CREATE,
  });

  submitted = signal(false);

  titleFormControl = new FormControl(
    { value: this.modalState().category?.title || '', disabled: false },
    {
      validators: [CustomValidators.trimRequired, Validators.maxLength(50)],
      nonNullable: true,
    },
  );
  descriptionFormControl = new FormControl(
    { value: this.modalState().category?.description || '', disabled: false },
    {
      validators: [Validators.maxLength(50)],
    },
  );
  iconFormControl = new FormControl(this.modalState().category?.icon || this.icons[0].name, {
    nonNullable: true,
  });
  colorFormControl = new FormControl(this.modalState().category?.color || 'green', {
    nonNullable: true,
  });

  categoryForm = new FormGroup({
    title: this.titleFormControl,
    description: this.descriptionFormControl,
    icon: this.iconFormControl,
    color: this.colorFormControl,
  });

  submit() {
    this.categoryForm.markAllAsTouched();

    this.submitted.set(true);

    if (this.categoryForm.invalid) return;

    const { title, description, icon, color } = this.categoryForm.getRawValue();

    const titleFormatted = title.trim();
    const descriptionFormatted =
      description == '' || description == null ? null : description.trim();

    this.submitEvent.emit({
      title: titleFormatted,
      description: descriptionFormatted,
      icon,
      color,
    });
  }
}
