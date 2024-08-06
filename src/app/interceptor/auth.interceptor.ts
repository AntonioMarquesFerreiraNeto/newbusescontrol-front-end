import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  const handleResponse = next(req.clone({
    setHeaders: token ? { 'Authorization': `Bearer ${token}` } : {}
  }));

  return handleResponse.pipe(
    tap({
      error: (err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('logged');
          router.navigate(['/auth/signin']);
        }
      }
    })
  );
};
