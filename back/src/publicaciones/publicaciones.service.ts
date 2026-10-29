import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto.js';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error as MongooseError } from 'mongoose';
import { PublicacionDocument } from './entities/publicacion.entity.js';
import { FileService } from '../file/file/file.service.js';

@Injectable()
export class PublicacionesService {

  constructor(@InjectModel('Publicacion') private readonly publicacionModel: Model<PublicacionDocument>, private readonly fileService: FileService) {}

  async create(createPublicacionDto: CreatePublicacionDto, autor: string, imagen?: Express.Multer.File) {
    let urlImagen: string | undefined;
    if(imagen) {
      if(!imagen.mimetype.startsWith('image/')) {
        throw new BadRequestException('El archivo tiene que ser una imagen');
      }
      urlImagen = await this.fileService.subirImagen(imagen)
    }
    try {
      return await this.publicacionModel.create({
        titulo: createPublicacionDto.titulo,
        mensaje: createPublicacionDto.mensaje,
        imagen: urlImagen,
        autor: autor})

    } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
        throw new BadRequestException(
          Object.values(error.errors).map((error) => error.message),
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.publicacionModel.find().populate('autor', 'nombreUsuario imagen');
  }

  findByUser(autor: string) {
    return this.publicacionModel
      .find({ autor: autor, habilitado: true })
      .sort({ fechaPublicacion: -1 })
      .populate('autor', 'nombreUsuario imagen');
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
