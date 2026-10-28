import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../servicios/auth';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  private auth = inject(Auth);
  private router = inject(Router);

  usuario = this.auth.usuario;

  cerrarSesion() {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
