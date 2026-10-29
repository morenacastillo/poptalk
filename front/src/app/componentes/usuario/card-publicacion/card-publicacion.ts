import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatosPublicacion } from '../../../modelos/publicacion';

@Component({
  imports: [DatePipe],
  selector: 'app-card-publicacion',
  styleUrl: './card-publicacion.css',
  templateUrl: './card-publicacion.html',
})

export class CardPublicacion {
  publicacion = input.required<DatosPublicacion>();
}
