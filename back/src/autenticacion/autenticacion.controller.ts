import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service.js';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto.js';
import { AuthDto } from './dto/auth.dto.js';
import { AuthGuard } from '../guards/auth/auth.guard.js';
import type { Response } from 'express';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly authService: AutenticacionService) {}

  @Post('login')
  async login(@Body() loginAuthDto: AuthDto,
              @Res({passthrough: true}) res: Response) {
    const result = await this.authService.login(loginAuthDto);
    this.authService.setTokenCookie(res, result.token);
    return result;
  }

  @Post('registro')
  async create(@Body() createAuthDto: CreateAutenticacionDto,
              @Res({passthrough: true}) res: Response) {
    const result = await this.authService.registro(createAuthDto);
    this.authService.setTokenCookie(res, result.token);
    return result;         
  }

  @Get('perfil/:id')
  @UseGuards(AuthGuard)
  validateToken(@Param('id') id: string) {
    return this.authService.getPerfil(id)
  }
  
}