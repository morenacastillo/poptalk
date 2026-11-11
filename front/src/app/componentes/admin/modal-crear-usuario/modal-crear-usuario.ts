import { Component, output, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { PasswordValidator } from '../../auth/validators/password-validator';
import { UsuariosService } from '../../../servicios/usuarios.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-modal-crear-usuario',
  styleUrl: './modal-crear-usuario.css',
  templateUrl: './modal-crear-usuario.html',
})
export class ModalCrearUsuario {
  cerrar = output<void>();
  creada = output<void>();

  formUsuario = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    apellido: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    correo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    nombreUsuario: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    contrasena: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$')] }),
    confirmarContrasena: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fechaNacimiento: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    descripcion: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    perfil: new FormControl('usuario', { nonNullable: true, validators: [Validators.required] }),
  }, PasswordValidator);


  error = signal('');
  cargando = signal(false);
  imagen: File | null = null;
  imagenNombre = signal('')

  constructor(private usuariosService: UsuariosService) {}

  crearUsuario() {
    if(this.formUsuario.invalid) {
      return
    }

    if(!this.imagen) {
      this.error.set('Elegi una imagen de perfil')
      return
    }

    this.cargando.set(true)
    this.error.set('')

    const valores = this.formUsuario.getRawValue();
    const datos = new FormData();
    datos.append('nombreUsuario', valores.nombreUsuario);
    datos.append('nombre', valores.nombre);
    datos.append('apellido', valores.apellido);
    datos.append('correo', valores.correo);
    datos.append('contrasena', valores.contrasena);
    datos.append('fechaNacimiento', valores.fechaNacimiento);
    datos.append('descripcion', valores.descripcion);
    datos.append('perfil', valores.perfil);
    datos.append('imagen', this.imagen);

    this.usuariosService.crearUsuario(datos).subscribe({
      next: () => {
        this.cargando.set(false);
        this.creada.emit()
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
    })
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
