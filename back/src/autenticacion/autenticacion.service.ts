import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto.js';
import { UpdateAutenticacionDto } from './dto/update-autenticacion.dto.js';
import type { Response } from 'express';
import { Usuario, UsuarioDocument } from '../usuarios/entities/usuario.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto.js';
import { PasswordHasher } from '@nestjs/authentication';


@Injectable()
export class AutenticacionService {

  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JwtService
    ){}

  async login(loginAuthDto: AuthDto) {
    const user = await this.usuarioModel.findOne({ correo: loginAuthDto.correo})

    if (!user || !(await this.passwordHasher.verify(loginAuthDto.contrasena, user.contrasena))) {
      throw new Error('Credenciales incorrectas')
    }

    return this.generateToken(user)
  }



  async registro(createAuthDto: CreateAutenticacionDto) {
    createAuthDto.contrasena = await this.passwordHasher.hash(createAuthDto.contrasena);
    const newUser = await this.usuarioModel.create(createAuthDto)

    if(!newUser) {
      throw new Error('Error al crear el usuario')
    }

    return this.generateToken(newUser) // esto hace q una vez registro ok, nos loguee con esa cuenta
                                        // si no se inicia sesion, no se genera token
  }
  

  async getPerfil(id: string ) {
    const user = await this.usuarioModel.findById(id)
    if (!user) {
      throw new Error('No se pudo obtener el perfil');
    }
    return user
  }
  
  generateToken(usuario: UsuarioDocument) {
    const payload = {correo: usuario.correo, sub: usuario._id}
    return this.jwtService.signAsync(payload)
  }


  setTokenCookie(res: Response, token: string) {
    res.cookie('token', token,
      { httpOnly: true, // para evitar ataques XSS
        sameSite: 'strict', // para evitar ataques CSRF
        secure: false,
        maxAge: 1000 * 20, // 20 segundos, sincronización con el token
      });
  }

}
