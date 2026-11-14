import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import { AdminGuard } from '../guards/admin/admin.guard.js';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Get('publicaciones-por-usuario')
  @UseGuards(AuthGuard, AdminGuard)
  publicacionesPorUsuario(@Query('desde') desde: string,
                          @Query('hasta') hasta: string) {
    return this.estadisticasService.publicacionesPorUsuario(desde, hasta)
  }


  @Get('comentarios-por-dia')
  @UseGuards(AuthGuard, AdminGuard)
  comentariosPorDia(@Query('desde') desde: string,
                          @Query('hasta') hasta: string) {
    return this.estadisticasService.comentariosPorDia(desde, hasta)
  }

  @Get('comentarios-por-publicacion')
  @UseGuards(AuthGuard, AdminGuard)
  comentariosPorPublicacion(@Query('desde') desde: string,
                          @Query('hasta') hasta: string) {
    return this.estadisticasService.comentariosPorPublicacion(desde, hasta)
  }

  
}
