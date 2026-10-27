import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { DatosLogin, DatosRegistro, RespuestaAuth } from '../modelos/auth';
import { Usuario } from '../modelos/usuario';

@Service()
export class Auth {
    private http = inject(HttpClient);
    public usuario = signal<Usuario | null>(this.leerUsuario());
    private url = environment.apiUrl + '/autenticacion'

    login(datos: DatosLogin) {
        return this.http.post<RespuestaAuth>(this.url + '/login', datos)
    }

    registro(datos: DatosRegistro) {
        return this.http.post<RespuestaAuth>(this.url + '/registro', datos)
    }

    guardarSesion(respuesta: RespuestaAuth) {
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
        this.usuario.set(respuesta.usuario);
    }

    cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.usuario.set(null);
    }

    estaLogueado() {
        return localStorage.getItem('token') !== null;
    }

    private leerUsuario(): Usuario | null {
        const guardado = localStorage.getItem('usuario');
        return guardado ? JSON.parse(guardado) : null;
    }

}
