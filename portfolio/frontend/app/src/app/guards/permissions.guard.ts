import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return from(authService.isAuth()).pipe(
    map(logged => {
      if (!logged) {
        router.navigate(["/login"]);
      }
      return logged;
    })
  );
};
