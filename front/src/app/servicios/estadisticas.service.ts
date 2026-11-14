import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Dato } from '../modelos/estadisticas';


@Service()
export class EstadisticasService {
    private http = inject(HttpClient)
    private url = environment.apiUrl + '/estadisticas';

    publicacionesPorUsuario(desde: string, hasta: string) {
        return this.http.get<Dato[]>(this.url + '/publicaciones-por-usuario?desde=' + desde + '&hasta=' + hasta);
    }

    comentariosPorDia(desde: string, hasta: string) {
        return this.http.get<Dato[]>(this.url + '/comentarios-por-dia?desde=' + desde + '&hasta=' + hasta);
    }

    comentariosPorPublicacion(desde: string, hasta: string) {
        return this.http.get<Dato[]>(this.url + '/comentarios-por-publicacion?desde=' + desde + '&hasta=' + hasta);
    }

}
