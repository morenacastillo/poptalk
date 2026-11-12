import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioDocument } from './entities/usuario.entity.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';

@Injectable()
export class UsuariosService {

  constructor(
  @InjectModel('Usuario') private readonly usuarioModel: Model<UsuarioDocument>) {}

  async findAll(offset: number = 0, limit: number) {
    const usuarios = await this.usuarioModel
      .find()
      .select('-contrasena')
      .sort({ nombreUsuario: 1 })
      .skip(offset * limit)
      .limit(limit)

    const total = await this.usuarioModel.countDocuments();
    const habilitados = await this.usuarioModel.countDocuments({ habilitado: true });
    return { usuarios, total, habilitados };
  }
  

  async habilitar(id: string) {
    const usuario = await this.usuarioModel.findById(id)
    if (!usuario) {
      throw new NotFoundException('El usuario no existe');
    }
    if (usuario.habilitado) {
      throw new BadRequestException('El usuario ya se encuentra habilitado');
    }

    usuario.habilitado = true;
    await usuario.save();
  }


  async remove(id: string, idAdmin: string) {
    if (id === idAdmin) {
      throw new BadRequestException('No podés deshabilitar tu propia cuenta');
    }
    const usuario = await this.usuarioModel.findById(id)
    if (!usuario) {
      throw new NotFoundException('El usuario no existe');
    }
    if (!usuario.habilitado) {
      throw new BadRequestException('El usuario ya se encuentra deshabilitado');
    }

    usuario.habilitado = false;
    await usuario.save();
  }

  async actualizarPerfil(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioModel.findById(id)
    if (!usuario) {
      throw new NotFoundException('El usuario no existe');
    }

    usuario.nombre = updateUsuarioDto.nombre;
    usuario.apellido = updateUsuarioDto.apellido;
    usuario.fechaNacimiento = updateUsuarioDto.fechaNacimiento;
    usuario.descripcion = updateUsuarioDto.descripcion;
    await usuario.save();

    return this.usuarioModel.findById(id).select('-contrasena');
    }


}
