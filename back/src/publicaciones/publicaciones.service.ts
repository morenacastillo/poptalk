import { BadRequestException, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  async findAll(orden: string = "fecha", offset: number = 0, limit: number) { // devuelve 5 x pagina (offset 0 / 1 /2)
    const filtro = {habilitado: true}
    let publicaciones;

    if(orden === 'megusta') {
      publicaciones = await this.publicacionModel.aggregate([
      { $match: filtro },
      { $addFields: { cantidadLikes: { $size: '$likes' } } },
      { $sort: { cantidadLikes: -1, fechaPublicacion: -1 } },
      { $skip: offset * limit },
      { $limit: limit },
      ]);
      publicaciones = await this.publicacionModel.populate(publicaciones, {
        path: 'autor',
        select: 'nombreUsuario imagen'
      });

    } else {
      publicaciones = await this.publicacionModel
      .find(filtro)
      .sort({ fechaPublicacion: -1})
      .skip(offset * limit) // offset 0 = 0 x 5 = 5 -> trae las primeras 5 (no saltea ninguna)
                            // offset 1 = 1 x 5 = 10 -> trae de 6 a 10 (se saltea de la 1 a 5)
                            // offset 2 = 2 x 5 = 15 -> trae de 11 a 15 (se saltea de la 1 a 10)
      .limit(limit)
      .populate('autor', 'nombreUsuario imagen')
    }
      const total = await this.publicacionModel.countDocuments(filtro);
      return { publicaciones, total };
  }
      

  findByUser(autor: string) {
    return this.publicacionModel
      .find({ autor: autor, habilitado: true })
      .sort({ fechaPublicacion: -1 })
      .limit(3)
      .populate('autor', 'nombreUsuario imagen');
  }

  async darMeGusta(id: string, usuarioId: string) {
    const publicacion = await this.publicacionModel.findById(id)
    if (!publicacion || !publicacion.habilitado) {
      throw new NotFoundException('La publicación no existe');
    }

    if(publicacion.likes.includes(usuarioId)) {
      throw new BadRequestException('Ya le diste me gusta a esta publicación');
    }

    publicacion.likes.push(usuarioId);
    await publicacion.save()
    return publicacion;
  }

  async quitarMeGusta(id: string, usuarioId: string) {
    const publicacion = await this.publicacionModel.findById(id)
    if (!publicacion || !publicacion.habilitado) {
      throw new NotFoundException('La publicación no existe');
    }

    if(!publicacion.likes.includes(usuarioId)) {
      throw new BadRequestException('Aun no le diste me gusta a esta publicación');
    }

    const likesNuevos: string[] = [];
    for (const like of publicacion.likes) {
      if (like !== usuarioId) {
        likesNuevos.push(like);
      }
    }
    publicacion.likes = likesNuevos;
    await publicacion.save();
    return publicacion;
    }

    
  async findOne(id: string) {
    const publicacion = await this.publicacionModel
      .findById(id)
      .populate('autor', 'nombreUsuario imagen');

    if (!publicacion || !publicacion.habilitado) {
      throw new NotFoundException('La publicación no existe');
    }

    return publicacion;
  }

  
  update(id: string, updatePublicacioneDto: UpdatePublicacionDto) {
    return `This action updates a #${id} publicacione`;
  }


  async remove(id: string, usuarioId: string, perfil: string) {
    const publicacion = await this.publicacionModel.findById(id)
    if(!publicacion || !publicacion.habilitado) {
      throw new NotFoundException('La publicación no existe');
    }

    const esAutor = publicacion.autor.toString() === usuarioId
    if(!esAutor && perfil !== 'administrador') {
      throw new ForbiddenException('No podés eliminar esta publicación');
    }

    publicacion.habilitado = false
    await publicacion.save()

    return publicacion
  }
}
