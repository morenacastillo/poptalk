import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicacionesService } from './publicaciones.service.js';
import { PublicacionesController } from './publicaciones.controller.js';
import { PublicacionSchema } from './entities/publicacion.entity.js';
import { FileService } from '../file/file/file.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Publicacion', schema: PublicacionSchema}])
    
  ],
  controllers: [PublicacionesController],
  providers: [PublicacionesService, FileService],
})
export class PublicacionesModule {}
