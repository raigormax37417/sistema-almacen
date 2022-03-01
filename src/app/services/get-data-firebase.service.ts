import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataFirebaseService {

  constructor(private firestore: AngularFirestore) { }

  getDataFirestore(): Observable<any> {
    return this.firestore.collection('herramientas').snapshotChanges();
  }
}
