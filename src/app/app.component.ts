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
  user$!: Observable<User | null>
  redirectUrl: string = ''
  title = 'sistema-almacen';
  isToggleActive: Boolean = false;
  @ViewChild('nav') nav!: ElementRef;

  constructor(public authService : AuthService, private router: Router, private render: Renderer2){}
  
  toogleNav()  {
    if(this.isToggleActive) {
      this.render.removeClass(this.nav.nativeElement,'hidden');
      this.isToggleActive = false;
    } else {
      this.render.addClass(this.nav.nativeElement, 'hidden');
      this.isToggleActive = true;
    }
  }

  getUser() {
    this.user$.subscribe(user => {
      console.log('update',{ user });
      if (user)
        this.redirect(user)
      this.router.navigate([this.redirectUrl])
    })
  }
  
  redirect(user: User | null): void {
    if (user?.roles?.admin) {
      this.redirectUrl = this.redirectUrl ? this.redirectUrl : this.ADMIN_PATH
      return
    }
    this.redirectUrl = this.redirectUrl ? this.redirectUrl :this.USER_PATH
  }
}
