import { Router } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, authState, updateProfile } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import { doc, docData, Firestore } from '@angular/fire/firestore';
export interface User {
  uid: string
  email: string
  displayName: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn: Boolean
  redirectUrl: string = ''
  user$: Observable<User | null>
  constructor(private auth: Auth, private router: Router, private firestore: Firestore) {
    this.userLoggedIn = false
    this.user$ = authState(this.auth).pipe(
      take(1),
      switchMap(user => {
        console.log({user},user);
        
        if (user){
          let docu = docData(doc(this.firestore, `users/${user.uid}`)) as Observable<User>
          return docu
        }
        
        console.log({user: "no user"});
        return of(null)
      })
    )
    console.log(this.user$);
    
    this.auth.onAuthStateChanged((loggedUser) => {
      if (loggedUser) {
        this.userLoggedIn = true
        this.user$ = of({ uid: loggedUser.uid, email: loggedUser.email!, displayName: loggedUser.displayName! })
        this.userLoggedIn = true
        this.router.navigateByUrl(this.redirectUrl)
        
      } else {
        this.userLoggedIn = false
        this.user$ = of(null)
      }
    })
  }
  signUp(user: any): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then(r => {
        let emailLower = user.email.toLowerCase();
        updateProfile(r.user,{displayName: user.displayName})
        console.log(r.user.emailVerified)
      }).catch(e=> e as string)
  }

  async loginEmail(user: any): Promise<any> {

    try {
      
      
      console.log(user);
      let login = await signInWithEmailAndPassword(this.auth, user.email, user.password)
      console.log(login.user);
      this.userLoggedIn = true
      this.router.navigate(['students'])
    } catch (error) {
      console.log('error',error);
      return error
      
  }


  }
  async loginGoogle() {
    let result = await signInWithPopup(this.auth, new GoogleAuthProvider());
    this.userLoggedIn = true
    this.router.navigate(['students'])
  }
  logout() {
    this.auth.signOut()
    this.userLoggedIn = false
    this.router.navigate(['auth'])
  }
  isLoggedIn() {
    return !!this.auth.currentUser
  }
}
