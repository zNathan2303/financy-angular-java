import { Component } from '@angular/core';
import { Header } from '../../shared/components/layout/header/header';
import { LucideAngularModule, Plus, Search, CircleArrowDown, CircleArrowUp } from 'lucide-angular';
import { InputBase } from '../../shared/components/inputs/input-base/input-base';
import { FormControl } from '@angular/forms';
import { SelectInput } from '../../shared/components/inputs/select-input/select-input';
import { SelectOption } from '../../shared/components/inputs/select-input/select-option/select-option';

@Component({
  selector: 'app-transactions',
  imports: [Header, LucideAngularModule, InputBase, SelectInput, SelectOption],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly CircleArrowDown = CircleArrowDown;
  readonly CircleArrowUp = CircleArrowUp;

  searchFormControl = new FormControl({ value: '', disabled: false });
}
