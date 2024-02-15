import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const checkLoggedIn = (AuthService: AuthService, Router: Router) => {
  return() => {
    return AuthService.isAuthenticated() ? true : Router.parseUrl('/login');
  }
};

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const routerService = inject(Router);
  return checkLoggedIn(authService, routerService)();
};
