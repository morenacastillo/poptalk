import { IsString, IsNotEmpty } from 'class-validator';

export class CreateComentarioDto {

    @IsString({ message: 'El mensaje tiene que ser texto' })
    @IsNotEmpty({ message: 'El mensaje es obligatorio' })
    mensaje: string;

}