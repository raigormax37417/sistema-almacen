import { Injectable } from '@angular/core';
import { doc, Firestore, collection, query, limit } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetDataFirestoreService {
    
  private path = "herramientas/";

  constructor(private firestore: Firestore) { }
  

  updateDataFirestore(path: string, id: string) {
    return doc(this.firestore, path, id);
  }
}
