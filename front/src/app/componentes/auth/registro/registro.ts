import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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


  constructor (private router: Router, private auth: Auth) {}

  async registro() {
    if (this.formRegistro.invalid) {
      return;
    }

    this.cargando.set(true);
    this.error.set('');
    this.guardadoOk.set(false);

    const valores = this.formRegistro.getRawValue();
    const datos = {
      nombreUsuario: valores.nombreUsuario,
      nombre: valores.nombre,
      apellido: valores.apellido,
      correo: valores.correo,
      contrasena: valores.contrasena,
      fechaNacimiento: valores.fechaNacimiento,
      descripcion: valores.descripcion,
    };

    this.auth.registro(datos).subscribe({
    next: () => {
      this.cargando.set(false);
      this.formRegistro.reset();
      this.router.navigate(['/login']);
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
    this.imagen = archivo;
    this.imagenNombre.set(archivo ? archivo.name : '');
  }
}
