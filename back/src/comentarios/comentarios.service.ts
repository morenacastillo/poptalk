import { BadRequestException, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto.js';
import { UpdateComentarioDto } from './dto/update-comentario.dto.js';
import { Comentario, ComentarioDocument } from './entities/comentario.entity.js';
import { Model, Error as MongooseError } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion } from '../publicaciones/entities/publicacion.entity.js';



@Injectable()
export class ComentariosService {

  constructor(@InjectModel('Comentario') private comentarioModel: Model<Comentario>,
              @InjectModel('Publicacion') private publicacionModel: Model<Publicacion>) {}

  async create(createComentarioDto: CreateComentarioDto, autor: string, publicacion: string) {
    const publicacionEncontrada = await this.publicacionModel.findById(publicacion);
    if (!publicacionEncontrada || publicacionEncontrada.habilitado === false) {
      throw new NotFoundException('La publicacion no existe');
    }

    try {
        return await this.comentarioModel.create({
          mensaje: createComentarioDto.mensaje,
          autor: autor,
          publicacion: publicacion})
  
      } catch (error) {
        if (error instanceof MongooseError.ValidationError) {
          throw new BadRequestException(
            Object.values(error.errors).map((error) => error.message),
          );
        }
        throw error;
      }
  }

  async findByPublicacion(idPublicacion: string, offset = 0, limit = 5) {
    const comentarios = await this.comentarioModel
    .find({publicacion: idPublicacion, habilitado: true})
    .sort({ fechaCreacion: -1 })
    .skip(offset * limit)
    .limit(limit)
    .populate('autor', 'nombreUsuario imagen');

    const total = await this.comentarioModel.countDocuments({ publicacion: idPublicacion, habilitado: true });

    return { comentarios, total}
  }


  async update(id: string, usuarioId: string, updateComentarioDto: UpdateComentarioDto) {
    const comentario = await this.comentarioModel.findById(id)
    if(!comentario || comentario.habilitado === false) {
      throw new NotFoundException('El comentario no existe');
    }

    if(comentario.autor.toString() !== usuarioId) {
      throw new ForbiddenException('No podés modificar este comentario');
    }

    comentario.mensaje = updateComentarioDto.mensaje;
    comentario.modificado = true
    return await comentario.save()
  }


  async remove(id: string, usuarioId: string, perfil: string) {
    const comentario = await this.comentarioModel.findById(id)
    if(!comentario || !comentario.habilitado) {
      throw new NotFoundException('El comentario no existe');
    }

    const esAutor = comentario.autor.toString() === usuarioId
    if(!esAutor && perfil !== 'administrador') {
      throw new ForbiddenException('No podés eliminar este comentario');
    }
    comentario.habilitado = false
    await comentario.save()

    return comentario
    }
  
}
