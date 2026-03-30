import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  disable() {
    document.body.classList.add('no-scroll');
  }

  enable() {
    document.body.classList.remove('no-scroll');
  }
}
