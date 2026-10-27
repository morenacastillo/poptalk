import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto.js';
import type { Response } from 'express';
import { Usuario, UsuarioDocument } from '../usuarios/entities/usuario.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto.js';
import { PasswordHasher } from '@nestjs/authentication';
import { FileService } from '../file/file/file.service.js';


@Injectable()
export class AutenticacionService {

  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JwtService,
    private readonly fileService: FileService
    ){}


  async login(loginAuthDto: AuthDto) {
    const user = await this.usuarioModel.findOne({ correo: loginAuthDto.correo})

    if (!user || !(await this.passwordHasher.verify(loginAuthDto.contrasena, user.contrasena))) {
      throw new UnauthorizedException('Las credenciales no son correctas');
    }

    return this.armarRespuesta(user);
  }



  async registro(createAuthDto: CreateAutenticacionDto, imagen: Express.Multer.File) {
    const correoUsado = await this.usuarioModel.findOne({ correo: createAuthDto.correo });
    if (correoUsado) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const usuarioUsado = await this.usuarioModel.findOne({ nombreUsuario: createAuthDto.nombreUsuario });
    if (usuarioUsado) {
      throw new BadRequestException('El nombre de usuario ya está en uso');
    }

    if (!imagen) {
      throw new BadRequestException('La imagen de perfil es obligatoria');
    }
    createAuthDto.imagen = await this.fileService.subirImagen(imagen);

    createAuthDto.contrasena = await this.passwordHasher.hash(createAuthDto.contrasena);
    const newUser = await this.usuarioModel.create(createAuthDto)

    if(!newUser) {
      throw new Error('Error al crear el usuario')
    }

    return this.armarRespuesta(newUser); // esto hace q una vez registro ok, nos loguee con esa cuenta
                                        // si no se inicia sesion, no se genera token
  }
  

  async getPerfil(id: string ) {
    const user = await this.usuarioModel.findById(id)
    if (!user) {
      throw new BadRequestException('No se pudo obtener el perfil');
    }
    return user
  }
  
  generateToken(usuario: UsuarioDocument) {
    const payload = {correo: usuario.correo, sub: usuario._id}
    return this.jwtService.signAsync(payload)
  }

  async armarRespuesta(user: UsuarioDocument) {
    const token = await this.generateToken(user);
    const usuario = {
      _id: user._id,
      nombreUsuario: user.nombreUsuario,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      fechaNacimiento: user.fechaNacimiento,
      descripcion: user.descripcion,
      imagen: user.imagen,
      perfil: user.perfil,
      habilitado: user.habilitado,
    };
    return { token, usuario };
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
