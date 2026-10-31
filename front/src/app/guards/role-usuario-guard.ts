import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

export const roleUsuarioGuard: CanMatchFn = (route, segments) => {
  const auth = inject(AuthService);

  if (auth.estaLogueado()) {
    return true;
  }

  return false;
};
