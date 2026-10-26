import { Injectable } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto.js';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto.js';

@Injectable()
export class PublicacionesService {
  create(createPublicacioneDto: CreatePublicacionDto) {
    return 'This action adds a new publicacione';
  }

  findAll() {
    return `This action returns all publicaciones`;
  }

  findOne(id: string) {
    return `This action returns a #${id} publicacione`;
  }

  update(id: string, updatePublicacioneDto: UpdatePublicacionDto) {
    return `This action updates a #${id} publicacione`;
  }

  remove(id: string) {
    return `This action removes a #${id} publicacione`;
  }
}
