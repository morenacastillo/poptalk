import { Component, input, OnInit, output } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { Usuario } from '../../../modelos/usuario';

@Component({
  imports: [],
  selector: 'app-sesion',
  styleUrl: './sesion.css',
  templateUrl: './sesion.html',
})
export class Sesion implements OnInit{
  segundos = input.required<number>();
  refrescar = output<void>();
  cerrar = output<void>();
  usuario: Usuario | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.usuario = this.authService.usuario();
  }
}
