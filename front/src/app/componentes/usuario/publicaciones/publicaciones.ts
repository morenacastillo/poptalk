import { Component, signal, OnInit } from '@angular/core';
import { DatosPublicacion } from '../../../modelos/publicacion';
import { HomePublicaciones } from '../../../servicios/homePublicaciones';
import { DatePipe } from '@angular/common';
import { CardPublicacion } from '../card-publicacion/card-publicacion';
import { ModalPublicacion } from '../modal-publicacion/modal-publicacion';
import { Auth } from '../../../servicios/auth';
import { CardPublicar } from '../card-publicar/card-publicar';

@Component({
  imports: [CardPublicacion, ModalPublicacion, CardPublicar],
  selector: 'app-publicaciones',
  styleUrl: './publicaciones.css',
  templateUrl: './publicaciones.html',
})
export class Publicaciones {
  publicaciones = signal<DatosPublicacion[]>([])
  error = signal('');
  modalAbierto = signal(false);
  pagina = signal(0);
  limite = 5;
  hayMas = signal(false);
  orden = signal('fecha');

  constructor(private publicacionesService: HomePublicaciones, private auth: Auth) {}

  ngOnInit() {
    this.obtenerPublicacionesHome()
  }

  obtenerPublicacionesHome() {
    this.publicacionesService.obtenerPublicaciones(this.pagina(), this.limite, this.orden()).subscribe({
      next: (respuesta) => {
        this.publicaciones.set(respuesta.publicaciones);
        this.hayMas.set((this.pagina() + 1) * this.limite < respuesta.total);
      },
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

  subirPublicacion() {
    this.modalAbierto.set(false);
    this.obtenerPublicacionesHome()
  }

  siguiente() {
    this.pagina.set(this.pagina() + 1);
    this.obtenerPublicacionesHome();
  }

  anterior() {
    this.pagina.set(this.pagina() - 1);
    this.obtenerPublicacionesHome();
  }

  cambiarOrden(nuevoOrden: string) {
    this.orden.set(nuevoOrden);
    this.pagina.set(0);
    this.obtenerPublicacionesHome();
  }

}

