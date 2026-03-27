import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'https://financy-angular-java.onrender.com';
  // const baseUrl = 'http://localhost:8080';

  const apiReq = req.clone({ url: `${baseUrl}${req.url}` });

  return next(apiReq);
};
