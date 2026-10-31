import { AutorPublicacion } from './publicacion';

export interface RespuestaComentarios {
    comentarios: DatosComentario[];
    total: number;
}

export interface DatosComentario {
    _id: string;
    mensaje: string;
    autor: AutorPublicacion;
    publicacion: string;
    fechaCreacion: string;
    modificado: boolean;
    habilitado: boolean;
}