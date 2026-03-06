import { Component } from '@angular/core';
import { Header } from '../../shared/components/layout/header/header';
import { LucideAngularModule, Plus, Search, CircleArrowDown, CircleArrowUp } from 'lucide-angular';
import { InputBase } from '../../shared/components/inputs/input-base/input-base';
import { FormControl } from '@angular/forms';
import { SelectInput } from '../../shared/components/inputs/select-input/select-input';
import { SelectOption } from '../../shared/components/inputs/select-input/select-option/select-option';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [Header, LucideAngularModule, InputBase, SelectInput, SelectOption, NgClass],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly CircleArrowDown = CircleArrowDown;
  readonly CircleArrowUp = CircleArrowUp;

  searchFormControl = new FormControl({ value: '', disabled: false });

  categories = [
    {
      id: 1,
      title: 'Alimentação',
      color: 'blue',
    },
    {
      id: 2,
      title: 'Transporte',
      color: 'purple',
    },
    {
      id: 3,
      title: 'Mercado',
      color: 'orange',
    },
    {
      id: 4,
      title: 'Investimento',
      color: 'green',
    },
    {
      id: 5,
      title: 'Utilidades',
      color: 'yellow',
    },
    {
      id: 6,
      title: 'Salário',
      color: 'green',
    },
    {
      id: 7,
      title: 'Entretenimento',
      color: 'pink',
    },
  ];
}
