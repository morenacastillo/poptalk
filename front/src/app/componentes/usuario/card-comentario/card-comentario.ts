import { Component, input, output, signal } from '@angular/core';
import { DatosComentario } from '../../../modelos/comentario';
import { DatePipe } from '@angular/common';
import { ComentariosService } from '../../../servicios/comentarios.service';
import { AuthService } from '../../../servicios/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [DatePipe, ReactiveFormsModule],
  selector: 'app-card-comentario',
  styleUrl: './card-comentario.css',
  templateUrl: './card-comentario.html',
})
export class CardComentario {
  comentario = input.required<DatosComentario>();

  error = signal('')

  eliminada = output<void>();

  editando = signal(false);
  modificado = output<void>();

  
  formEditarComentario = new FormGroup({
    mensaje: new FormControl('', [Validators.required, Validators.maxLength(300)])
  })

  constructor(private comentariosService: ComentariosService, private auth: AuthService) {}

  borrarComentario() {
    this.comentariosService.bajaComentario(this.comentario()._id).subscribe({
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
    return usuario?._id === this.comentario().autor?._id || usuario?.perfil === 'administrador';
  }

  empezarEdicion() {
    this.formEditarComentario.patchValue({ mensaje: this.comentario().mensaje})
    this.editando.set(true)
  }

  cancelarEdicion() {
    this.editando.set(false)
  }

  guardarEdicionComentario() {
    if(this.formEditarComentario.invalid){
      return
    }
    const nuevoMensaje = this.formEditarComentario.getRawValue().mensaje!

    this.comentariosService.modificarComentario(this.comentario()._id, nuevoMensaje).subscribe({
      next: () => {
        this.editando.set(false)
        this.modificado.emit()
      },
      error: (err) => { 
        if (err.status === 0) {
          this.error.set('No se pudo conectar con el servidor.');
          return;
        }
        const mensaje = err.error?.message;
        this.error.set(Array.isArray(mensaje) ? mensaje.join('. ') : (mensaje ?? 'Ocurrió un error inesperado.'));
      }
    })
  }

  puedeEditar() {
    const usuario = this.auth.usuario();
    return usuario?._id === this.comentario().autor?._id;
  }
}
