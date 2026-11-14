import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contador',
})
export class ContadorPipe implements PipeTransform {
  transform(texto: string | null, maximo: number): string {
    let largo = 0;
    if (texto) {
      largo = texto.length;
    }
    return largo + '/' + maximo;
  }
}