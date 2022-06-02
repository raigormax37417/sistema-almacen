import { tap, take, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../interfaces';
import { Firestore, CollectionReference, collection, getDoc, doc, setDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { DocumentData } from 'rxfire/firestore/interfaces';

export interface Profile {
  id?: string,
  name: string,
  controlNumber: string,
  semester: number,
  group: string,
  career: string,

}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  colectionRef: CollectionReference
  private userID: string = ''
  profile: Observable<Profile | undefined> = of(undefined)
  private user : User | null = null
  constructor(private firestore: Firestore, private authService: AuthService) {
    this.colectionRef = collection(this.firestore, 'profiles')
    this.profile = this.authService.user$.pipe(switchMap(

      async user => {
        if (!user) {
          return
        }
        this.user = user
        this.userID = user!.uid
        console.log('settid', this.userID);
        let profileDoc = await getDoc(doc(this.colectionRef, this.userID))
        console.log('log', profileDoc.exists());
        if (profileDoc.exists())
          return { id: profileDoc!.id, ...profileDoc!.data() } as unknown as Profile
        return undefined
      }
    )
    )

  }
  async getProfile() {

    // let profile = await getDoc(doc(this.colection, this.userID))
    // let data = profile.data()
    // return {id: profile.id, ...data}
  }
  async update(newData: Profile) {
    this.user!.profile = this.userID
    newData.id = this.userID
    console.log('updating',this.user, newData);
    await setDoc(doc(this.colectionRef, this.userID), newData, { merge: true })
    await this.authService.updateUserData(this.user!)
    
    return true
  }
}
