import { Injectable } from '@angular/core';
import { setDoc, docData, updateDoc ,Firestore, doc, deleteDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  
  constructor(private firestore: Firestore) {
  }
  
  createDoc(data: any, path: string, id: string) {
    return setDoc(doc(this.firestore, path, id), data);
  }

  getDoc(path: string, id: string) {
    return docData(doc(this.firestore, path, id));
  }
  
  deleteDoc(id: string, path: string) {
    return deleteDoc(doc(this.firestore, id, path))
  }

  updateDoc(id: string, path: string, data: any) {
    return updateDoc(doc(this.firestore,id, path), data);
  }
  getID() {
    return doc(collection(this.firestore, 'id')).id;
  }
  
  getDataFirestore<tipo>(path: string) {
   const dataRef = collection(this.firestore, path);
   return dataRef;
  }

  
}
