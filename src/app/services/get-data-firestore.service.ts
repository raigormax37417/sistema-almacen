import { Injectable, QueryList } from '@angular/core';
import { doc, Firestore,collection, collectionChanges, CollectionReference, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetDataFirestoreService {
    
  private path = "herramientas/";

  constructor(private firestore: Firestore) { }
  
  getDataFirestore<tipo>() {
   const dataRef = collection(this.firestore, this.path);
   return dataRef;
  }


  updateDataFirestore(path: string, id: string) {
    return doc(this.firestore, path, id);
  }
}
