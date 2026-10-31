import { Component, OnInit, signal } from '@angular/core';
import { DatosPublicacion } from '../../../modelos/publicacion';
import { ActivatedRoute } from '@angular/router';
import { PublicacionesService } from '../../../servicios/publicaciones.service';
import { CardPublicacion } from '../card-publicacion/card-publicacion';

@Component({
  imports: [CardPublicacion],
  selector: 'app-publicacion-detalle',
  styleUrl: './publicacion-detalle.css',
  templateUrl: './publicacion-detalle.html',
})
export class PublicacionDetalle implements OnInit {
  publicacion = signal<DatosPublicacion | null>(null);
  error = signal('');

  constructor(private route: ActivatedRoute, private publicacionesService: PublicacionesService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.publicacionesService.obtenerPublicacion(id!).subscribe({
      next: (respuesta) => this.publicacion.set(respuesta),
      error: () => this.error.set('No se pudo cargar la publicación.')
    });
  }
}
