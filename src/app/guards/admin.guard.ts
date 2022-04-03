import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoggedIn(state.url) && this.isAdmin();
  }
  checkLoggedIn(url: string) {
    if (this.authService.isLoggedIn()) return true

    this.authService.redirectUrl = url
    this.router.navigate(['auth'])
    return false

  }
  isAdmin(){
    return this.authService.user$.pipe(
      take(1),
      map(user => user?.roles!.admin ? true : false),
      tap(isAdmin => {
        if (!isAdmin)
          this.router.navigate(['auth'])
      })
    )
  }
  
}
