import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token) {
    request = request.clone({
      setHeaders: {
        'token': token
      }
    });
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
        return throwError(() => new Error('Unauthorized access. Please login again.'));
      }
      if (error.status === 403) {
        return throwError(() => new Error('Access denied. You do not have permission to perform this action.'));
      }
      if (error.status === 404) {
        return throwError(() => new Error('The requested resource was not found.'));
      }
      if (error.status >= 500) {
        return throwError(() => new Error('Server error. Please try again later.'));
      }
      return throwError(() => error);
    })
  );
};
