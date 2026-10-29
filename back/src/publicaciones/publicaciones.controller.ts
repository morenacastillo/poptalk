import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service.js';
import { CreatePublicacionDto } from './dto/create-publicacion.dto.js';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import type { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('imagen', { storage: memoryStorage() }))
  create(@Body() createPublicacionDto: CreatePublicacionDto,
        @Req() req: Request & { user: { sub: string } },
        @UploadedFile() imagen?: Express.Multer.File) {
    return this.publicacionesService.create(createPublicacionDto, req.user.sub, imagen);
  }

  @Get()
  findAll() {
    return this.publicacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionesService.findOne(id);
  }

  @Get('autor/:id')
  findByUser(@Param('id') id: string) {
    return this.publicacionesService.findByUser(id);
  }
  
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string,
        @Req() req: Request & { user: { sub: string; perfil: string } }) {
    return this.publicacionesService.remove(id, req.user.sub, req.user.perfil);
  }

}
