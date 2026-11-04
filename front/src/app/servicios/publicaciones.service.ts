import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { DatosPublicacion } from '../modelos/publicacion';
import { RespuestaPublicaciones } from '../modelos/publicacion';


@Service()
export class PublicacionesService {
    private http = inject(HttpClient);
    private url = environment.apiUrl + '/publicaciones';

    obtenerPublicacion(idPublicacion: string) {
        return this.http.get<DatosPublicacion>(this.url + '/' + idPublicacion);
    }
    
    obtenerPublicaciones(offset: number = 0, limit: number = 10, orden: string = 'fecha') {
        return this.http.get<RespuestaPublicaciones>(
            this.url + '?offset=' + offset + '&limit=' + limit + '&orden=' + orden);
    }

    obtenerPublicacionesPorUsuario(idAutor: string) {
        return this.http.get<DatosPublicacion[]>(this.url + '/autor/' + idAutor);
    }

    crearPubliacion(datos: FormData) {
        return this.http.post<DatosPublicacion>(this.url, datos);
    }

    bajaPublicacion(idPublicacion: string) {
        return this.http.delete<DatosPublicacion>(this.url + '/' + idPublicacion);
    }

    darMeGusta(idPublicacion: string) {
        return this.http.post<DatosPublicacion>(this.url + '/' + idPublicacion + '/megusta', {})
    }

    quitarMeGusta(idPublicacion: string) {
        return this.http.delete<DatosPublicacion>(this.url + '/' + idPublicacion + '/megusta')
    }
}
