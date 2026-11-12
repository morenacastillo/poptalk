import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import type { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UsuariosService } from './usuarios.service.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import { AdminGuard } from '../guards/admin/admin.guard.js';
import { AutenticacionService } from '../autenticacion/autenticacion.service.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService,
            private readonly authService: AutenticacionService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('imagen', { storage: memoryStorage() }))
  create(@Body() createUsuarioDto: CreateUsuarioDto,
        @UploadedFile() imagen: Express.Multer.File) {
    return this.authService.registro(createUsuarioDto, imagen, createUsuarioDto.perfil);
  }

  @Post('habilitar/:id')
  @UseGuards(AuthGuard, AdminGuard)
  habilitar(@Param('id') id: string) {
    return this.usuariosService.habilitar(id);
  }


  @Put('perfil')
  @UseGuards(AuthGuard)
  actualizarPerfil(@Body() updateUsuarioDto: UpdateUsuarioDto,
                    @Req() req: Request & { user: { sub: string } }) {
    return this.usuariosService.actualizarPerfil(req.user.sub, updateUsuarioDto)
                    }


  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  findAll(@Query('offset') offset?: string,
          @Query('limit') limit?: string) {
      return this.usuariosService.findAll(Number(offset) || 0, Number(limit) || 10);
    }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  remove(@Param('id') id: string,
        @Req() req: Request & { user: { sub: string } }) {
    return this.usuariosService.remove(id, req.user.sub);
  }
}
