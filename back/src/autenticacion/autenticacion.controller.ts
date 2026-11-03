import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service.js';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto.js';
import { AuthDto } from './dto/auth.dto.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly authService: AutenticacionService) {}

  @Post('login')
  async login(@Body() loginAuthDto: AuthDto,
              @Res({passthrough: true}) res: Response) {
    const result = await this.authService.login(loginAuthDto);
    this.authService.setTokenCookie(res, result.token);
    return { usuario: result.usuario }; //al front solo le devuelvo el usuario, el token lo guarda el navegador
  }

  @Post('logout')
  logout(@Res({passthrough: true}) res: Response) {
    this.authService.clearTokenCookie(res);
    return { mensaje: 'Sesión cerrada' };
  }

  @Post('registro')
  @UseInterceptors(FileInterceptor('imagen', { storage: memoryStorage() }))
  async create(@Body() createAuthDto: CreateAutenticacionDto,
              @Res({passthrough: true}) res: Response,
              @UploadedFile() imagen: Express.Multer.File) {
  const result = await this.authService.registro(createAuthDto, imagen);
  return result;
}

  @Get('perfil')
  @UseGuards(AuthGuard)//antes de entrar al id de un usuario, valida el token
  validateToken(@Req() req: Request & { user: { sub: string } }) {
    return this.authService.getPerfil(req.user.sub)
  }
  
}