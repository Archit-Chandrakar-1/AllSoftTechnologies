import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

export const LoadingInterceptor: HttpInterceptorFn = (request, next) => {
  // Show loading indicator
  showLoading();

  return next(request).pipe(
    finalize(() => {
      // Hide loading indicator
      hideLoading();
    })
  );
};

function showLoading(): void {
  // You can implement a loading service here
  // For now, we'll just add a class to the body
  document.body.classList.add('loading');
}

function hideLoading(): void {
  // Remove loading class from body
  document.body.classList.remove('loading');
}
