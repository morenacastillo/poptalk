export interface RespuestaUsuarios {
    usuarios: Usuario[];
    total: number;
    habilitados: number;
}

export interface Usuario {
    _id: string;
    nombreUsuario: string;
    nombre: string;
    apellido: string;
    correo: string;
    fechaNacimiento: string;
    descripcion: string;
    imagen: string;
    perfil: string;
    habilitado: boolean;
}


export interface DatosPerfil {
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    descripcion: string;
}