import { Router } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, authState, updateProfile } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import { User, Roles } from '../interfaces';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ADMIN_PATH = 'admin'
  private readonly USER_PATH = 'students'
  userLoggedIn: Boolean
  redirectUrl: string = ''
  user$: Observable<User | null>
  constructor(private auth: Auth, private router: Router, private firestore: Firestore) {
    this.userLoggedIn = false
    this.user$ = authState(this.auth).pipe(
      switchMap(user => {
        if (user) {
          this.userLoggedIn = true
          localStorage.setItem('user', JSON.stringify(user))
          return docData(doc(firestore, `users/${user?.uid}`)) as Observable<User>

        }
        localStorage.removeItem('user')
        return of(null)

      }
      )
    )
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

  signUp(user: any): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then(async r => {
        let emailLower = user.email.toLowerCase();

        return await this.updateUserData({
          uid: r.user.uid,
          email: r.user.email!
        })

      }).catch(e => e as string)
  }

  async loginEmail(user: any): Promise<any> {

    try {
      let login = await signInWithEmailAndPassword(this.auth, user.email, user.password)
      console.log(login);
      
      // this.updateUserData(user)
      this.userLoggedIn = true

      this.router.navigate([this.USER_PATH])
    } catch (error) {
      return error

    }

  }
  async loginGoogle() {
    let result = await signInWithPopup(this.auth, new GoogleAuthProvider());
    await this.updateUserData(result.user as unknown as User)
    
    this.userLoggedIn = true
    this.router.navigate([this.USER_PATH])
  }
  logout() {
    this.auth.signOut()
    this.userLoggedIn = false
    this.router.navigate(['auth'])
  }
  isLoggedIn() {
    return !!this.auth.currentUser
  }
  updateUserData(user: User) {
    console.log('updating UserData', user);
    
    const userRef = doc(this.firestore, `users/${user.uid}`)
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: { student: true }
    }
    return setDoc(userRef, data, { merge: true })
  }
}
