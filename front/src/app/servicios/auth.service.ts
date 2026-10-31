import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { DatosLogin, RespuestaAuth } from '../modelos/auth';
import { Usuario } from '../modelos/usuario';

@Service()
export class AuthService {
    private http = inject(HttpClient);
    public usuario = signal<Usuario | null>(this.leerUsuario());
    private url = environment.apiUrl + '/autenticacion'

    // withCredentials: true hace que el navegador reciba y mande la cookie con el token
    login(datos: DatosLogin) {
        return this.http.post<RespuestaAuth>(this.url + '/login', datos, { withCredentials: true })
    }

    registro(datos: FormData) {
        return this.http.post<RespuestaAuth>(this.url + '/registro', datos, { withCredentials: true })
    }

    // el token vive en la cookie (httpOnly): acá solo se guardan los datos del usuario
    guardarSesion(usuario: Usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuario.set(usuario);
    }

    // la cookie httpOnly no se puede borrar desde el front: se le pide al back que la borre
    cerrarSesion() {
        this.http.post(this.url + '/logout', {}, { withCredentials: true }).subscribe({
            error: () => {}
        });
        localStorage.removeItem('usuario');
        this.usuario.set(null);
    }

    estaLogueado() {
        return this.usuario() !== null;
    }

    private leerUsuario(): Usuario | null {
        const guardado = localStorage.getItem('usuario');
        return guardado ? JSON.parse(guardado) : null;
    }

}
