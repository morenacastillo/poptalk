import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

export const roleAdminGuard: CanMatchFn = (route, segments) => {
  const auth = inject(AuthService);

  if (auth.estaLogueado() && auth.usuario()?.perfil === 'administrador') {
    return true;
  }

  return false;
};