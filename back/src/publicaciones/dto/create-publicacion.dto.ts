import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePublicacionDto {
    @IsString({ message: 'El título tiene que ser texto' })
    @IsNotEmpty({ message: 'El título es obligatorio' })
    titulo: string;

    @IsString({ message: 'El mensaje tiene que ser texto' })
    @IsNotEmpty({ message: 'El mensaje es obligatorio' })
    mensaje: string;

    @IsString()
    @IsOptional()
    imagen: string;

    
}