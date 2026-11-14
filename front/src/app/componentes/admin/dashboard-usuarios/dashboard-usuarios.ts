import { Component, signal } from '@angular/core';
import { Usuario } from '../../../modelos/usuario';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { AuthService } from '../../../servicios/auth.service';
import { ModalCrearUsuario } from '../modal-crear-usuario/modal-crear-usuario';
import { NombreCompletoPipe } from '../../../pipes/nombre-completo-pipe';


@Component({
  imports: [ModalCrearUsuario, NombreCompletoPipe],
  selector: 'app-dashboard-usuarios',
  styleUrl: './dashboard-usuarios.css',
  templateUrl: './dashboard-usuarios.html',
})
export class DashboardUsuarios {
  usuarios = signal<Usuario[]>([])
  error = signal('');
  pagina = signal(0);
  limite = 8;
  hayMas = signal(false);
  modalAbierto = signal(false);
  total = signal(0);
  habilitados = signal(0);

  constructor(private usuariosService: UsuariosService, private auth: AuthService) {}
  
    ngOnInit() {
      this.obtenerUsuarios()
    }
  
    obtenerUsuarios() {
      this.usuariosService.obtenerUsuarios(this.pagina(), this.limite).subscribe({
        next: (respuesta) => {
          this.usuarios.set(respuesta.usuarios);
          this.total.set(respuesta.total);
          this.habilitados.set(respuesta.habilitados);
          this.hayMas.set((this.pagina() + 1) * this.limite < respuesta.total);
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

    siguiente() {
      this.pagina.set(this.pagina() + 1);
      this.obtenerUsuarios();
    }

    anterior() {
      this.pagina.set(this.pagina() - 1);
      this.obtenerUsuarios();
    }

    usuarioCreado() {
      this.modalAbierto.set(false);
      this.obtenerUsuarios();
    }

    deshabilitar(id: string) {
      this.usuariosService.deshabilitarUsuario(id).subscribe({
        next: () => this.obtenerUsuarios(),
        error: (err) => this.error.set(err.error?.message ?? 'No se pudo deshabilitar al usuario.')
      });
    }

    habilitar(id: string) {
      this.usuariosService.habilitarUsuario(id).subscribe({
        next: () => this.obtenerUsuarios(),
        error: (err) => this.error.set(err.error?.message ?? 'No se pudo habilitar al usuario.')
      });
    }

    esMiCuenta(id: string) {
      return this.auth.usuario()?._id === id;
    }
}
