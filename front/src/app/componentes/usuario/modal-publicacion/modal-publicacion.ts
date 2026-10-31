import { Component, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PublicacionesService } from '../../../servicios/publicaciones.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-modal-publicacion',
  styleUrl: './modal-publicacion.css',
  templateUrl: './modal-publicacion.html',
})
export class ModalPublicacion {

  cerrar = output<void>();
  creada = output<void>();

  formPublicacion = new FormGroup({
    titulo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    mensaje: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  error = signal('');
  cargando = signal(false);
  imagen: File | null = null;
  imagenNombre = signal('')

  constructor(private publicacionesService: PublicacionesService) {}

  publicar() {
    if (this.formPublicacion.invalid) {
      return;
    }
    this.cargando.set(true);
    this.error.set('');

    const valores = this.formPublicacion.getRawValue();
    const datos = new FormData();
    datos.append('titulo', valores.titulo);
    datos.append('mensaje', valores.mensaje);
    if (this.imagen) {
      datos.append('imagen', this.imagen);
    }

    this.publicacionesService.crearPubliacion(datos).subscribe({
      next: () => {
        this.cargando.set(false);
        this.formPublicacion.reset();
        this.creada.emit();
      },
      error: (err) => {
        this.cargando.set(false);
        if (err.status === 0) {
          this.error.set('No se pudo conectar con el servidor.');
          return;
        }
        const mensaje = err.error?.message;
        this.error.set(Array.isArray(mensaje) ? mensaje.join('. ') : (mensaje ?? 'Ocurrió un error inesperado.'));
      }
    });
  }

  seleccionarImagen(event: Event) {
      const input = event.target as HTMLInputElement;
      const archivo = input.files?.[0] ?? null;

      if (archivo && archivo.size > 500 * 1024) {
        this.error.set('La imagen no puede pesar más de 500 KB.');
        input.value = '';
        this.imagen = null;
        this.imagenNombre.set('');
        return;
      }

      this.error.set('');
      this.imagen = archivo;
      this.imagenNombre.set(archivo ? archivo.name : '');
    }



}
