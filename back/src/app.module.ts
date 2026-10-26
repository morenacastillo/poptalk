import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { PublicacionesModule } from './publicaciones/publicaciones.module.js';
import { AutenticacionModule } from './autenticacion/autenticacion.module.js';


@Module({
  imports: [ConfigModule.forRoot(),
            MongooseModule.forRoot(process.env.CONNECTION_STRING!),
            UsuariosModule,
            PublicacionesModule,
            AutenticacionModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
