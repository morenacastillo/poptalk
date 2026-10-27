import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../servicios/auth';

export const roleAdminGuard: CanMatchFn = (route, segments) => {
  const auth = inject(Auth);

  if (auth.estaLogueado() && auth.usuario()?.perfil === 'administrador') {
    return true;
  }

  return false;
};