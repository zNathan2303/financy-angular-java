import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LucideAngularModule, Undo2 } from 'lucide-angular';

@Component({
  selector: 'app-not-implemented',
  imports: [LucideAngularModule],
  template: `<h1>Página não implementada.</h1>
    <button (click)="goBack()">
      Voltar para a página anterior<lucide-icon [img]="Undo2" size="20" />
    </button> `,
  styleUrl: './not-implemented.css',
})
export class NotImplemented {
  readonly Undo2 = Undo2;

  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
