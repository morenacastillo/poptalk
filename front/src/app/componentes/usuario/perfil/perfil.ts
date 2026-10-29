import { Component, OnInit, signal } from '@angular/core';
import { Auth } from '../../../servicios/auth';
import { Usuario } from '../../../modelos/usuario';
import { HomePublicaciones } from '../../../servicios/homePublicaciones';
import { DatosPublicacion } from '../../../modelos/publicacion';
import { DatePipe } from '@angular/common';
import { CardPublicacion } from '../card-publicacion/card-publicacion';
import { ModalPublicacion } from '../modal-publicacion/modal-publicacion';

@Component({
  imports: [CardPublicacion, ModalPublicacion],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})

export class Perfil implements OnInit {
  usuario: Usuario | null = null;
  publicacionesUsuario = signal<DatosPublicacion[]>([])
  error = signal('');
  modalAbierto = signal(false);

  constructor(private auth: Auth, private publicacionesService: HomePublicaciones) {}

  ngOnInit() {
    this.usuario = this.auth.usuario();
    this.obtenerPublicacionesPerfil()
  }

  obtenerPublicacionesPerfil() {
    this.publicacionesService.obtenerPublicacionesPorUsuario(this.auth.usuario()!._id).subscribe({ 
      next: (lista) => this.publicacionesUsuario.set(lista),
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
    this.obtenerPublicacionesPerfil()
  }

  
}