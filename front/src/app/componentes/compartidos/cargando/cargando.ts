import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-cargando',
  styleUrl: './cargando.css',
  templateUrl: './cargando.html',
})
export class Cargando implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
    this.authService.autorizar().subscribe({
      next: (respuesta) => {
        this.authService.guardarSesion(respuesta.usuario);
        this.authService.guardarVencimiento(respuesta.exp! * 1000);
        setTimeout(() => this.router.navigate(['/home']), 3000);
      },
      error: () => {
        setTimeout(() => this.router.navigate(['/login']), 3000);
      }
    });
  }
}