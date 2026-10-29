export interface AutorPublicacion {
    _id: string;
    nombreUsuario: string;
    imagen?: string;
}

export interface DatosPublicacion {
    _id: string;
    titulo: string;
    mensaje: string;
    imagen?: string;
    autor: AutorPublicacion;
    fechaPublicacion: string;
    likes: string[];
    habilitado: boolean;
}