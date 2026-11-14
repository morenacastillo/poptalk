import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publicacion } from './entities/publicacion.entity.js';
import { Comentario } from '../comentarios/entities/comentario.entity.js';

export interface Dato {
  etiqueta: string;
  cantidad: number;
}


@Injectable()
export class EstadisticasService {

  constructor(@InjectModel('Publicacion') private publicacionModel: Model<Publicacion>,
              @InjectModel('Comentario') private comentarioModel: Model<Comentario>) {}

  armarRango(desde: string, hasta: string) {
    if(!desde || !hasta) {
      throw new BadRequestException('Tenés que indicar la fecha desde y la fecha hasta');
    }

    const fechaDesde = new Date(desde)
    const fechaHasta = new Date(hasta + 'T23:59:59.999Z') // hasta el final de ese día

    if(isNaN(fechaDesde.getTime()) || isNaN(fechaHasta.getTime())) {
      throw new BadRequestException('Las fechas no son válidas');
    }

    if(fechaDesde > fechaHasta) {
      throw new BadRequestException('La fecha desde no puede ser posterior a la fecha hasta');
    }

    return {$gte: fechaDesde, $lte: fechaHasta}
  }

  sumar(resultado: Dato[], etiqueta: string) {
    for(const dato of resultado) {
      if(dato.etiqueta === etiqueta) {
        dato.cantidad++;
        return
      }
    }
    resultado.push({etiqueta: etiqueta, cantidad: 1})
  }

  async publicacionesPorUsuario(desde: string, hasta: string) {
    const publicaciones = await this.publicacionModel
    .find({habilitado: true, fechaPublicacion: this.armarRango(desde, hasta)})
    .populate('autor', 'nombreUsuario');

    const resultado: Dato[] = []

    for(const publicacion of publicaciones) {
      const autor: any = publicacion.autor;
      this.sumar(resultado, autor.nombreUsuario)
    }
    return resultado
  }

  async comentariosPorDia(desde: string, hasta: string) {
    const comentarios = await this.comentarioModel
    .find({ habilitado: true, fechaCreacion: this.armarRango(desde, hasta) })
    .sort({ fechaCreacion: 1 });

    const resultado: Dato[] = []

    for(const comentario of comentarios) {
      const dia = comentario.fechaCreacion.toISOString().substring(0, 10);
      this.sumar(resultado, dia)
    }
    return resultado
  }

  async comentariosPorPublicacion(desde: string, hasta: string) {
    const comentarios = await this.comentarioModel
    .find({ habilitado: true, fechaCreacion: this.armarRango(desde, hasta) })
    .populate('publicacion', 'titulo habilitado');

    const resultado: Dato[] = []
    
    for(const comentario of comentarios) {
      const publicacion: any = comentario.publicacion;
      if(publicacion && publicacion.habilitado) {
        this.sumar(resultado, publicacion.titulo)
      }
    }
    return resultado;

  }

}
