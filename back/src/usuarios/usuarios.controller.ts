import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UsuariosService } from './usuarios.service.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import { AdminGuard } from '../guards/admin/admin.guard.js';
import { AutenticacionService } from '../autenticacion/autenticacion.service.js';

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
