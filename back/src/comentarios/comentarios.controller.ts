import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ComentariosService } from './comentarios.service.js';
import { CreateComentarioDto } from './dto/create-comentario.dto.js';
import { UpdateComentarioDto } from './dto/update-comentario.dto.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';


@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post(':idPublicacion')
  @UseGuards(AuthGuard)
  create(@Body() createComentarioDto: CreateComentarioDto,
        @Param('idPublicacion') idPublicacion: string,
        @Req() req: Request & { user: { sub: string } },
        ) {
      return this.comentariosService.create(createComentarioDto, req.user.sub, idPublicacion);
  }

  @Get('publicacion/:idPubliacion')
  findByPublicacion(
    @Param('idPubliacion') idPublicacion: string,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
  ) {
    return this.comentariosService.findByPublicacion(idPublicacion, Number(offset) || 0, Number(limit) || 5);
  }



  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string,
        @Body() updateComentarioDto: UpdateComentarioDto,
        @Req() req: Request & { user: { sub: string } }) {
    return this.comentariosService.update(id, req.user.sub, updateComentarioDto);
  }


  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string,
          @Req() req: Request & { user: { sub: string; perfil: string } }) {
    return this.comentariosService.remove(id, req.user.sub, req.user.perfil);
  }
}
