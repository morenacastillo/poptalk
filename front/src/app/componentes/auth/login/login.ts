import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../servicios/auth';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  formLogin = new FormGroup({
    correo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    contrasena: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$')] }),
  });

  error = signal('');
  cargando = signal(false);
  guardadoOk = signal(false);

  constructor(private router: Router, private auth: Auth) {}

  login() {
    if (this.formLogin.invalid) {
      return;
    }
    this.cargando.set(true);
    this.error.set('');

    this.auth.login(this.formLogin.getRawValue()).subscribe({
      next: (respuesta) => {
        this.cargando.set(false);
        this.auth.guardarSesion(respuesta.usuario);
        this.router.navigate(['/home']);
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
}
