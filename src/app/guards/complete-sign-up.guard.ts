import { ProfileService } from './../services/profile.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompleteSignUpGuard implements CanActivateChild {



  constructor(private authService: AuthService, private profileService: ProfileService, private router: Router) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkStudentRole();
  }

  checkStudentRole() {
    return this.profileService.profile.pipe(map(profile => {
      console.log(!!profile)
      return !!profile
    }),
    tap(res =>{
      console.log({res});
      if (res) {
        return true
      }
      this.router.navigate(['auth/confirm'])
      return res
      
    })
    )
  }

}
