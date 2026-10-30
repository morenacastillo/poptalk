import { Component, output } from '@angular/core';
import { Auth } from '../../../servicios/auth';

@Component({
  selector: 'app-card-publicar',
  styleUrl: './card-publicar.css',
  templateUrl: './card-publicar.html',
})
export class CardPublicar {
  abrir = output<void>();

  constructor(private auth: Auth) {}

  fotoUsuario() {
    return this.auth.usuario()?.imagen;
  }
}