import {ActivatedRouteSnapshot, createUrlTreeFromSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const authGuard = (next: ActivatedRouteSnapshot) => {
  return inject(AuthService).isAuthenticated() ? true : createUrlTreeFromSnapshot(next, ['/', 'login']);
};
