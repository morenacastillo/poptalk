import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { DatosLogin, RespuestaAuth, RespuestaRefresh } from '../modelos/auth';
import { Usuario } from '../modelos/usuario';

@Service()
export class AuthService {
    private http = inject(HttpClient);
    public usuario = signal<Usuario | null>(this.leerUsuario());
    private url = environment.apiUrl + '/autenticacion'

    login(datos: DatosLogin) {
        return this.http.post<RespuestaAuth>(this.url + '/login', datos)
    }

    registro(datos: FormData) {
        return this.http.post<RespuestaAuth>(this.url + '/registro', datos)
    }

    // el token vive en la cookie q lo manda el back; acá solo se guardan los datos del usuario
    guardarSesion(usuario: Usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuario.set(usuario);
        this.guardarVencimiento();
    }

    // la cookie httpOnly no se puede borrar desde el front: se le pide al back que la borre
    cerrarSesion() {
        this.http.post(this.url + '/logout', {}).subscribe({
            error: () => {}
        });
        localStorage.removeItem('usuario');
        localStorage.removeItem('vencimiento');
        this.usuario.set(null);
    }

    estaLogueado() {
        return this.usuario() !== null;
    }

    private leerUsuario(): Usuario | null {
        const guardado = localStorage.getItem('usuario');
        return guardado ? JSON.parse(guardado) : null;
    }

    refreshToken() {
        return this.http.post<RespuestaRefresh>(this.url + '/refresh', {})
    }

    guardarVencimiento(hasta: number = Date.now() + 45 * 1000) {
        localStorage.setItem('vencimiento', String(hasta))
    }

    leerVencimiento() {
        return Number(localStorage.getItem('vencimiento'))
    }

    autorizar() {
        return this.http.post<RespuestaAuth>(this.url + '/autorizar', {})
    }

}
