import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentariosService } from './comentarios.service.js';
import { ComentariosController } from './comentarios.controller.js';
import { ComentarioSchema } from './entities/comentario.entity.js';
import { PublicacionSchema } from '../publicaciones/entities/publicacion.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comentario', schema: ComentarioSchema }]),
    MongooseModule.forFeature([{ name: 'Publicacion', schema: PublicacionSchema }]),
  ],
  controllers: [ComentariosController],
  providers: [ComentariosService],
})
export class ComentariosModule {}