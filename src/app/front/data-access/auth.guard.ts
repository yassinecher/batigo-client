import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../back/users/data-access/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = this.userService.getUserRole(); // Get the user role from UserService (or localStorage, etc.)

    if (!role) {
      // Redirect to login if the user does not have a role
      return this.router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      });
    }

    // If user has a role, allow access
    return true;
  }
  canDeactivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = this.userService.getUserRole(); // Get the user role from UserService (or localStorage, etc.)

    if (role) {
      // Redirect to login if the user does not have a role
      return this.router.createUrlTree(['/dashboard'], {
        queryParams: { returnUrl: state.url }
      });
    }

    // If user has a role, allow access
    return false;
  }
  
}
