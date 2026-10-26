import { Injectable } from '@nestjs/common';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto.js';
import { UpdateAutenticacionDto } from './dto/update-autenticacion.dto.js';

@Injectable()
export class AutenticacionService {
  create(createAutenticacionDto: CreateAutenticacionDto) {
    return 'This action adds a new autenticacion';
  }

  findAll() {
    return `This action returns all autenticacion`;
  }

  findOne(id: string) {
    return `This action returns a #${id} autenticacion`;
  }

  update(id: string, updateAutenticacionDto: UpdateAutenticacionDto) {
    return `This action updates a #${id} autenticacion`;
  }

  remove(id: string) {
    return `This action removes a #${id} autenticacion`;
  }
}
