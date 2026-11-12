import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaUsuarios, DatosPerfil, Usuario  } from '../modelos/usuario';
import { RespuestaAuth } from '../modelos/auth';

@Service()
export class UsuariosService {
    private http = inject(HttpClient)
    private url = environment.apiUrl + '/usuarios';

    obtenerUsuarios(offset: number = 0, limit: number = 10) {
        return this.http.get<RespuestaUsuarios>(this.url + '?offset=' + offset + '&limit=' + limit);
    }

    crearUsuario(datos: FormData) {
        return this.http.post<RespuestaAuth>(this.url, datos);
    }

    deshabilitarUsuario(id: string) {
        return this.http.delete(this.url + '/' + id);
    }

    habilitarUsuario(id: string) {
        return this.http.post(this.url + '/habilitar/' + id, {});
    }

    editarPerfil(datos: DatosPerfil) {
        return this.http.put<Usuario>(this.url + '/perfil', datos);
    }
}
