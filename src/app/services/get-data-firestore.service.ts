import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataFirestoreService {
  
  constructor(private firestore: AngularFirestore) { }
  
  getDataFirestore(): Observable<any> {
    let db = this.firestore;
    return db.collection('herramientas').snapshotChanges();
  }

  updateDataFirestore(documentID:string, value: number) {
    let db = this.firestore;
    return db.collection('herramientas').doc(documentID).update({
      cantidad: value  
    });
  }
}
