import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: {
      clone: (arg0: { setHeaders: { Authorization: string | null } }) => any;
    },
    next: { handle: (arg0: any) => any }
  ) {
    const accessToken = req.clone({
      setHeaders: {
        Authorization: this.authService.getAcessToken(),
      },
    });
    return next.handle(accessToken);
  }
}
