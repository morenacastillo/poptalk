import { Injectable } from '@nestjs/common';
import { CreatePublicacioneDto } from './dto/create-publicacion.dto.js';
import { UpdatePublicacioneDto } from './dto/update-publicacion.dto.js';

@Injectable()
export class PublicacionesService {
  create(createPublicacioneDto: CreatePublicacioneDto) {
    return 'This action adds a new publicacione';
  }

  findAll() {
    return `This action returns all publicaciones`;
  }

  findOne(id: string) {
    return `This action returns a #${id} publicacione`;
  }

  update(id: string, updatePublicacioneDto: UpdatePublicacioneDto) {
    return `This action updates a #${id} publicacione`;
  }

  remove(id: string) {
    return `This action removes a #${id} publicacione`;
  }
}
