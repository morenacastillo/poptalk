import { IsIn } from 'class-validator';
import { CreateAutenticacionDto } from '../../autenticacion/dto/create-autenticacion.dto.js';

export class CreateUsuarioDto extends CreateAutenticacionDto {
    @IsIn(['usuario', 'administrador'], { message: 'El perfil tiene que ser usuario o administrador' })
    perfil: string;
}