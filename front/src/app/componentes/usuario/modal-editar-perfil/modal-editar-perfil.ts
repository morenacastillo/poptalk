import { Component, OnInit, output, signal } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { AuthService } from '../../../servicios/auth.service';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-modal-editar-perfil',
  styleUrl: './modal-editar-perfil.css',
  templateUrl: './modal-editar-perfil.html',
})
export class ModalEditarPerfil implements OnInit{
  cerrar = output<void>();
  guardado = output<void>();

  formPerfil = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    apellido: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fechaNacimiento: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    descripcion: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
  });

  error = signal('');
  cargando = signal(false);

  constructor(private usuariosService: UsuariosService, private auth: AuthService) {}

  ngOnInit() {
    const usuario = this.auth.usuario()!;
    this.formPerfil.setValue({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fechaNacimiento: usuario.fechaNacimiento.substring(0, 10),
      descripcion: usuario.descripcion,
    });
  }

  guardar () {
    if(this.formPerfil.invalid) {
      return
    }
    this.cargando.set(true)
    this.error.set('')

    this.usuariosService.editarPerfil(this.formPerfil.getRawValue()).subscribe({
      next: (usuario) => {
        this.cargando.set(false);
        this.auth.actualizarUsuario(usuario);
        this.guardado.emit();
      },
      error: (err) => {
        this.cargando.set(false)
        if (err.status === 0) {
          this.error.set('No se pudo conectar con el servidor.');
          return;
        }
        const mensaje = err.error?.message;
        if (Array.isArray(mensaje)) {
          this.error.set(mensaje.join('. '));
          return;
        }
        this.error.set(mensaje ?? 'Ocurrió un error inesperado.');
      }
    })
  }

}
