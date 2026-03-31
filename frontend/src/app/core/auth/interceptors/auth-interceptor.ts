import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = authService.getToken();
  const router = inject(Router);

  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(cloned).pipe(
      catchError((error) => {
        if (error.status === 401 || (error.status === 403 && !req.url.includes('/auth/login'))) {
          authService.logout();

          router.navigateByUrl('/login');
        }

        return throwError(() => error);
      }),
    );
  }

  return next(req);
};
