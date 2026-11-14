import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recortar',
})
export class RecortarPipe implements PipeTransform {
  transform(texto: string, maximo: number): string {
    if (texto.length <= maximo) {
      return texto;
    }
    return texto.substring(0, maximo) + '...';
  }
}