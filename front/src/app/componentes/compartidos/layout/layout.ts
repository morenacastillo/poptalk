import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { AuthService } from '../../../servicios/auth.service';
import { Sesion } from '../sesion/sesion';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  imports: [Navbar, Footer, RouterOutlet, Sesion ],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout implements OnInit, OnDestroy{
  mostrarAviso = signal(false)
  segundos = signal(0)
  private avisoRespondido = false
  private intervalo?: ReturnType<typeof setInterval>

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.intervalo = setInterval(() =>{
      const restante = Math.round((this.authService.leerVencimiento() - Date.now()) / 1000)
      this.segundos.set(restante);

      if(restante <= 15 && restante > 0 && !this.avisoRespondido) {
        this.mostrarAviso.set(true)
      }

      if(restante <= 0){
        this.mostrarAviso.set(false)
        this.cerrarAviso();
      }

    }, 1000)
  }

  ngOnDestroy() {
    clearInterval(this.intervalo)
  }


  refrescar() {
    this.authService.refreshToken().subscribe({
      next: () => {
        this.authService.guardarVencimiento();
        this.avisoRespondido = false;
        this.mostrarAviso.set(false);
      },
      error: () => {
        this.mostrarAviso.set(false);
      }
    });
  }

  cerrarAviso() {
    clearInterval(this.intervalo);
    this.mostrarAviso.set(false);
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
