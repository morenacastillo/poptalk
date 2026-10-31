import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { PublicacionesModule } from './publicaciones/publicaciones.module.js';
import { AutenticacionModule } from './autenticacion/autenticacion.module.js';
import { AuthenticationModule } from '@nestjs/authentication';
import { ComentariosModule } from './comentarios/comentarios.module.js';

@Module({
  imports: [ConfigModule.forRoot(),
            MongooseModule.forRoot(process.env.CONNECTION_STRING!), // conexion con mongo
            UsuariosModule,
            PublicacionesModule,
            AutenticacionModule,
            AuthenticationModule.forRoot({
              globalGuard: false,
              session: {
                absoluteTtl: '14d',
                idleTtl: '3d'
            },
          }),
            ComentariosModule
        ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
