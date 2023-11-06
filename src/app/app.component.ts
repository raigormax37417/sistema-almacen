import { AuthService } from './services/auth.service';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { User, Roles } from './interfaces';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly ADMIN_PATH = 'admin'
  private readonly USER_PATH = 'students'
  public user$!: Observable<User | null>
  public redirectUrl: string = ''
  public title = 'sistema-almacen';
  public isToggleActive: Boolean = true;
  public isProfileToggleActive: Boolean = true;

  @ViewChild('nav') nav!: ElementRef;
  @ViewChild('profile') profileNav!: ElementRef;

  constructor(public authService : AuthService, private router: Router, private render: Renderer2){}
  /**
   * When user active menu button display content and
   * when click same button toggle to hide content
   */
  public toggleNav()  {
    if(this.isToggleActive) {
      // this.render.removeClass(this.nav.nativeElement,'hidden');
      this.render.setStyle(this.nav.nativeElement, 'display', 'flex')
      this.isToggleActive = false;
    } else {
      // this.render.addClass(this.nav.nativeElement, 'hidden');
      this.render.setStyle(this.nav.nativeElement, 'display', 'none');
      this.isToggleActive = true;
    }
  }
  /**
   * Active toggle when user click into photo profile
   */
  public toggleProfileNav() {
    if(this.isProfileToggleActive) {
      this.render.setStyle(this.profileNav.nativeElement, 'display', 'block');
      this.isProfileToggleActive = false;
    } else {
      this.render.setStyle(this.profileNav.nativeElement, 'display', 'none');
      this.isProfileToggleActive = true;
    }
  }

  public getUser() {
    this.user$.subscribe(user => {
      console.log('update',{ user });
      if (user)
        this.redirect(user)
      this.router.navigate([this.redirectUrl])
    })
  }
  
  public redirect(user: User | null): void {
    if (user?.roles?.admin) {
      this.redirectUrl = this.redirectUrl ? this.redirectUrl : this.ADMIN_PATH
      return
    }
    this.redirectUrl = this.redirectUrl ? this.redirectUrl :this.USER_PATH
  }
  /**
   * Check active route and return url has a string
   * @returns {string} route
   */
  public activeRoute(): string {
    return this.router.url;
  }

  public isActiveUser(): boolean {
    console.log(this.authService.isLoggedIn());
    
    return this.authService.isLoggedIn();
  }
}
