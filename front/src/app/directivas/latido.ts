import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[appLatido]',
  host: {
    '(click)': 'latir()',
    '[style.transform]': 'escala()',
    '[style.transition]': 'transicion',
  },
})
export class Latido {
  activo = signal(false);
  transicion = 'transform .15s ease';

  latir() {
    this.activo.set(true);
    setTimeout(() => this.activo.set(false), 150);
  }

  escala() {
    if (this.activo()) {
      return 'scale(1.05)';
    }
    return '';
  }
}