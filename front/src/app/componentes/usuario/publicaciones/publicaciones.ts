import { Component, signal, OnInit } from '@angular/core';
import { DatosPublicacion } from '../../../modelos/publicacion';
import { HomePublicaciones } from '../../../servicios/homePublicaciones';
import { DatePipe } from '@angular/common';
import { CardPublicacion } from '../card-publicacion/card-publicacion';
import { ModalPublicacion } from '../modal-publicacion/modal-publicacion';

@Component({
  imports: [CardPublicacion, ModalPublicacion],
  selector: 'app-publicaciones',
  styleUrl: './publicaciones.css',
  templateUrl: './publicaciones.html',
})
export class Publicaciones {
  publicaciones = signal<DatosPublicacion[]>([])
  error = signal('');
  modalAbierto = signal(false);

  constructor(private publicacionesService: HomePublicaciones) {}

  ngOnInit() {
    this.obtenerPublicacionesHome()
  }

  obtenerPublicacionesHome() {
    this.publicacionesService.obtenerPublicaciones().subscribe({
      next: (lista) => this.publicaciones.set(lista),
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
}
