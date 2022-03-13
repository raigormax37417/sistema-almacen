import { Injectable } from '@angular/core';
import { Firestore,collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetDataFirestoreService {
  
  constructor(private firestore: Firestore) { }
  
  getDataFirestore() {
    const dataRef = collection(this.firestore,'herramientas');
    return dataRef;
  }

  updateDataFirestore() {
  }
}
