import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../servicios/auth';

export const roleUsuarioGuard: CanMatchFn = (route, segments) => {
  const auth = inject(Auth);

  if (auth.estaLogueado()) {
    return true;
  }

  return false;
};
