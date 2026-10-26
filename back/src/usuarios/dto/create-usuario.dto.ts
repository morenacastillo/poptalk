import { IsString, IsNotEmpty, IsBoolean, IsEmail, MinLength, IsOptional, IsDateString, Matches } from 'class-validator';

export class CreateUsuarioDto {
    @IsString({ message: 'El nombre de usuario tiene que ser texto' })
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    nombreUsuario: string;

    @IsString({ message: 'El nombre tiene que ser texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    nombre: string;

    @IsString({ message: 'El apellido tiene que ser texto' })
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    apellido: string;

    @IsEmail({}, { message: 'El correo no tiene un formato válido' })
    @IsNotEmpty({ message: 'El correo es obligatorio' })
    correo: string;

    @IsString({ message: 'La contraseña tiene que ser texto' })
    @MinLength(8, { message: 'La contraseña tiene que tener al menos 8 caracteres' })
    contrasena: string;

    @IsDateString({}, { message: 'La fecha de nacimiento no es válida' })
    fechaNacimiento: Date;

    @IsString({ message: 'La descripción tiene que ser texto' })
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    descripcion: string;

    @IsString()
    @IsOptional()
    imagen: string;

    @IsString()
    @IsOptional()
    perfil: string;

    @IsBoolean()
    @IsOptional()
    habilitado: boolean;
}