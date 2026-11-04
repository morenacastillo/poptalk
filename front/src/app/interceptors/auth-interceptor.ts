import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, catchError } from 'rxjs';

//req: La petición que se va a mandar: headers, body, URL, todo.
//next: La función que la pasa al siguiente interceptor, o la manda a la API si no hay más.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const pedido = req.clone({ withCredentials: true }); // withCredentials: true hace que el navegador reciba y mande la cookie con el token

  const esLogin = req.url.includes('/login');
  const esAutorizar = req.url.includes('/autorizar');

  return next(pedido).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !esLogin && !esAutorizar) {
        localStorage.removeItem('usuario');
        localStorage.removeItem('vencimiento');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};