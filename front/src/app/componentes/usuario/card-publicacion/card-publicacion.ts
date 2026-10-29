import { Component, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatosPublicacion } from '../../../modelos/publicacion';
import { HomePublicaciones } from '../../../servicios/homePublicaciones';
import { Auth } from '../../../servicios/auth';


@Component({
  imports: [DatePipe],
  selector: 'app-card-publicacion',
  styleUrl: './card-publicacion.css',
  templateUrl: './card-publicacion.html',
})

export class CardPublicacion {
  publicacion = input.required<DatosPublicacion>();
  eliminada = output<void>();
  error = signal('')
  

  constructor(private publicacionesService: HomePublicaciones, private auth: Auth) {}

  borrarPubliacion() {
    this.publicacionesService.bajaPublicacion(this.publicacion()._id).subscribe({
      next: () => this.eliminada.emit(),
      error: (err) => { 
        if (err.status === 0) {
          this.error.set('No se pudo conectar con el servidor.');
          return;
        }
        const mensaje = err.error?.message;
        this.error.set(Array.isArray(mensaje) ? mensaje.join('. ') : (mensaje ?? 'Ocurrió un error inesperado.'));
      }
    });
  }

  puedeEliminar() {
    const usuario = this.auth.usuario();
    return usuario?._id === this.publicacion().autor?._id || usuario?.perfil === 'administrador';
}

}
