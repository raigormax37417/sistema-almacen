import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from "firebase/compat/app";
export interface User{
  email:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn : Boolean
  redirectUrl : string = ''
  // user$: Observable<User>
  constructor(private auth: Auth, private router : Router) { 
    this.userLoggedIn = false
    // this.user$ = this.auth
    this.auth.onAuthStateChanged((user:any) => {
      if (user){
        this.userLoggedIn = true
      }else{
        this.userLoggedIn = false
      }
    })
  }
  signUp(user:any): Promise<any>{
    return createUserWithEmailAndPassword(this.auth,user.email, user.password)
    .then( r =>{
      let emailLower = user.email.toLowerCase();
      console.log(r.user.emailVerified)
    })
  }
  async loginEmail(user: any): Promise<any>{

    let login = await signInWithEmailAndPassword(this.auth, user.email, user.password)
    console.log(login.user);
    this.userLoggedIn = true
    this.router.navigate(['students'])
    
    
  }
  async loginGoogle(){
    let result = await signInWithPopup(this.auth,new GoogleAuthProvider());
    this.userLoggedIn = true
    this.router.navigate(['students'])
  }
  logout(){
    this.auth.signOut()
    this.userLoggedIn=false
    this.router.navigate(['auth'])
  }
  isLoggedIn(){
    return !!this.auth.currentUser
  }
}
