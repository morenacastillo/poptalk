import { Usuario } from './usuario';

export interface RespuestaAuth {
    usuario: Usuario;
    exp?: number;
}

export interface RespuestaRefresh {
    token: string;
    exp: number;
}

export interface DatosLogin {
    correo: string;
    contrasena: string;
}

export interface DatosRegistro {
    nombreUsuario: string;
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    fechaNacimiento: string;
    descripcion: string;
}