import { Component, signal, input, OnInit } from '@angular/core';
import { DatosComentario } from '../../../modelos/comentario';
import { ComentariosService } from '../../../servicios/comentarios.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardComentario } from '../card-comentario/card-comentario';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, CardComentario, RouterLink],
  selector: 'app-comentarios',
  styleUrl: './comentarios.css',
  templateUrl: './comentarios.html',
})
export class Comentarios implements OnInit{
  comentarios = signal<DatosComentario[]>([])
  idPublicacion = input.required<string>()
  error = signal('');
  pagina = signal(0);
  resumen = input(false);
  hayMas = signal(false);

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit() {
    this.obtenerComentarios(this.idPublicacion());
  }

  formComentario = new FormGroup({
    mensaje: new FormControl('', [Validators.required, Validators.maxLength(300)])
  })
  
  obtenerComentarios(idPubliacion: string) {
    this.comentariosService.obtenerComentariosPorPublicacion(idPubliacion, this.pagina(), this.cantidadPorPagina()).subscribe({
      next: (respuesta) => {
        this.comentarios.set(respuesta.comentarios);
        this.hayMas.set((this.pagina() + 1) * this.cantidadPorPagina() < respuesta.total);
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

  crearComentario() {
    if(this.formComentario.invalid){
      return
    }
    this.comentariosService.crearComentario(this.idPublicacion(),
    this.formComentario.getRawValue().mensaje!).subscribe({
      next: () => {
        this.formComentario.reset();
        this.recargar();
      },
      error: (err) => {
        const mensaje = err.error?.message;
        this.error.set(Array.isArray(mensaje) ? mensaje.join('. ') : (mensaje ?? 'Ocurrió un error inesperado.'));
      }
    });
  }

  
  cantidadPorPagina() {
  if (this.resumen()) {
    return 2;
  }
  return 5;
  }

  cargarMas() {
    this.pagina.set(this.pagina() + 1);
    this.comentariosService.obtenerComentariosPorPublicacion(
      this.idPublicacion(), this.pagina(), this.cantidadPorPagina()).subscribe({
      next: (respuesta) => {
        const todos: DatosComentario[] = [];
        for (const comentario of this.comentarios()) {
          todos.push(comentario);
        }
        for (const comentario of respuesta.comentarios) {
          todos.push(comentario);
        }
        this.comentarios.set(todos);
        this.hayMas.set((this.pagina() + 1) * this.cantidadPorPagina() < respuesta.total);
      },
      error: () => this.error.set('No se pudieron cargar más comentarios.')
    });
  }

  recargar() {
    this.pagina.set(0);
    this.obtenerComentarios(this.idPublicacion());
  }

}
