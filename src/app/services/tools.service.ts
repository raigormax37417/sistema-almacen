import { Injectable } from '@angular/core';
import { setDoc, docData, updateDoc ,Firestore, doc, deleteDoc } from '@angular/fire/firestore';

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
}
