import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service.js';
import { AutenticacionController } from './autenticacion.controller.js';
import { UsuarioSchema } from '../usuarios/entities/usuario.entity.js';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from '../file/file/file.service.js';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Usuario', schema: UsuarioSchema }]), //paso el schema del modulo
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '20s'}
    }),

  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, FileService],
})
export class AutenticacionModule {}
