import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompleteSignUpGuard implements CanActivateChild {



constructor(private authService: AuthService, private router:Router){}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkStudentRole();
  }

  checkStudentRole() {
    return this.authService.user$.pipe(
      take(1),
      map(user => !!user?.profile),
      tap((hasProfile) => {
        if (!hasProfile)
          this.router.navigate(['profile'])
      })
    )
  }
  
}
