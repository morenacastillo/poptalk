import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { DatosPublicacion } from '../modelos/publicacion';


@Service()
export class HomePublicaciones {
    private http = inject(HttpClient);
    private url = environment.apiUrl + '/publicaciones';

    obtenerPublicaciones() {
        return this.http.get<DatosPublicacion[]>(this.url, { withCredentials: true });
    }

    obtenerPublicacionesPorUsuario(idAutor: string) {
        return this.http.get<DatosPublicacion[]>(this.url + '/autor/' + idAutor, { withCredentials: true });
    }

    crearPubliacion(datos: FormData) {
        return this.http.post<DatosPublicacion>(this.url, datos, { withCredentials: true });
    }

    bajaPublicacion(idPublicacion: string) {
        return this.http.delete<DatosPublicacion>(this.url + '/' + idPublicacion, { withCredentials: true });
    }
}
