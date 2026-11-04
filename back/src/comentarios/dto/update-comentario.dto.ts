import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateComentarioDto {

    @IsString({ message: 'El mensaje tiene que ser texto' })
    @IsNotEmpty({ message: 'El mensaje es obligatorio' })
    @MaxLength(300, { message: 'El mensaje no puede tener más de 300 caracteres' })
    mensaje: string;

}