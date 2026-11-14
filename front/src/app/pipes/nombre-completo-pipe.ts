import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../modelos/usuario';

@Pipe({
  name: 'nombreCompleto',
})
export class NombreCompletoPipe implements PipeTransform {
  transform(usuario: Usuario | null): string {
    if (!usuario) {
      return '';
    }
    return usuario.nombre + ' ' + usuario.apellido;
  }
}