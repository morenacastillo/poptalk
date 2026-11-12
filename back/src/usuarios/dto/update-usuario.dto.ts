import { IsString, IsNotEmpty, IsDateString } from 'class-validator';


export class UpdateUsuarioDto {
    @IsString({ message: 'El nombre tiene que ser texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    nombre: string;

    @IsString({ message: 'El apellido tiene que ser texto' })
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    apellido: string;

    @IsDateString({}, { message: 'La fecha de nacimiento no es válida' })
    fechaNacimiento: Date;

    @IsString({ message: 'La descripción tiene que ser texto' })
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    descripcion: string;
}