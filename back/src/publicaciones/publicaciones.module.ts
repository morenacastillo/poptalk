import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicacionesService } from './publicaciones.service.js';
import { PublicacionesController } from './publicaciones.controller.js';
import { PublicacionSchema } from './entities/publicacion.entity.js';
import { FileService } from '../file/file/file.service.js';
import { EstadisticasController } from './estadisticas.controller.js';
import { EstadisticasService } from './estadisticas.service.js';
import { ComentarioSchema } from '../comentarios/entities/comentario.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Publicacion', schema: PublicacionSchema}]),
    MongooseModule.forFeature([{name: 'Comentario', schema: ComentarioSchema}]),
  ],
  controllers: [PublicacionesController, EstadisticasController],
  providers: [PublicacionesService, FileService, EstadisticasService],
})
export class PublicacionesModule {}