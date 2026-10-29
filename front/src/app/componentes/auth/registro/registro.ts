import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { PasswordValidator } from '../validators/password-validator';
import { Auth } from '../../../servicios/auth';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  formRegistro = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    apellido: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    correo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    nombreUsuario: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    contrasena: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$')] }),
    confirmarContrasena: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fechaNacimiento: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    descripcion: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
  }, PasswordValidator);

  error = signal('');
  cargando = signal(false);
  guardadoOk = signal(false);

  imagen: File | null = null;
  imagenNombre = signal('');


  constructor (private auth: Auth) {}

  registro(inputImagen: HTMLInputElement) {
    if (this.formRegistro.invalid) {
      return;
    }

    if (!this.imagen) {
      this.error.set('Elegí una foto de perfil.');
      return;
    }

    this.cargando.set(true);
    this.error.set('');
    this.guardadoOk.set(false);

    const valores = this.formRegistro.getRawValue();
    const datos = new FormData();
    datos.append('nombreUsuario', valores.nombreUsuario);
    datos.append('nombre', valores.nombre);
    datos.append('apellido', valores.apellido);
    datos.append('correo', valores.correo);
    datos.append('contrasena', valores.contrasena);
    datos.append('fechaNacimiento', valores.fechaNacimiento);
    datos.append('descripcion', valores.descripcion);
    datos.append('imagen', this.imagen);

    this.auth.registro(datos).subscribe({
    next: () => {
      this.cargando.set(false);
      this.formRegistro.reset();
      this.imagen = null;
      this.imagenNombre.set('');
      inputImagen.value = '';
      this.guardadoOk.set(true);
    setTimeout(() => this.guardadoOk.set(false), 3000);
  },
    error: (err) => {
      this.cargando.set(false);
      const mensaje = err.error?.message;
      this.error.set(Array.isArray(mensaje) ? mensaje.join('. ') : (mensaje ?? 'No se pudo conectar con el servidor.'));
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
