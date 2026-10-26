import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../servicios/auth';
import { Usuario } from '../../../modelos/usuario';

@Component({
  imports: [],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})

export class Perfil implements OnInit {
  usuario: Usuario | null = null;

  constructor(private auth: Auth) {}

  ngOnInit() {
    this.usuario = this.auth.usuario();
  }
}