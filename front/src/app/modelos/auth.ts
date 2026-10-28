import { Usuario } from './usuario';

export interface RespuestaAuth {
    usuario: Usuario;
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