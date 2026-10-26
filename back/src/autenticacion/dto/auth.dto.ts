import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthDto {
    @IsEmail({}, { message: 'El correo no tiene un formato válido' })
    @IsNotEmpty({ message: 'El correo es obligatorio' })
    correo: string;

    @IsString({ message: 'La contraseña tiene que ser texto' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    contrasena: string;
}