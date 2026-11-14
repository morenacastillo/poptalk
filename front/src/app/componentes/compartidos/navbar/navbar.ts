import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';
import { SoloAdmin } from '../../../directivas/solo-admin';

@Component({
  imports: [RouterLink, RouterLinkActive, SoloAdmin],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  private auth = inject(AuthService);

  usuario = this.auth.usuario;
}