import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaComentarios, DatosComentario } from '../modelos/comentario';



@Service()
export class ComentariosService {
    private http = inject(HttpClient);
    private url = environment.apiUrl + '/comentarios';

    
    obtenerComentariosPorPublicacion(idPubliacion: string, offset: number, limit: number) {
        return this.http.get<RespuestaComentarios>(
            this.url + '/publicacion/' + idPubliacion + '?offset=' + offset + '&limit=' + limit, 
            { withCredentials: true });
    }

    crearComentario(idPublicacion: string, mensaje: string) {
        return this.http.post<DatosComentario>(
            this.url + '/' + idPublicacion,
            { mensaje: mensaje },
            { withCredentials: true }
        );
    }
    
    bajaComentario(idComentario: string) {
        return this.http.delete<DatosComentario>(this.url + '/' + idComentario, { withCredentials: true });
    }

    modificarComentario(idComentario: string, mensaje: string) {
        return this.http.put<DatosComentario>(
            this.url + '/' + idComentario,
            { mensaje: mensaje },
            { withCredentials: true }
        );
    }
}
