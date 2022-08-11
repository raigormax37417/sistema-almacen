import { Injectable } from '@angular/core';
import { setDoc, docData, updateDoc ,Firestore, doc, deleteDoc, collection, collectionSnapshots } from '@angular/fire/firestore';
import { orderBy, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  
  constructor(private firestore: Firestore) {
  }
  
  createDoc(data: any, path: string, id: string) {
    return setDoc(doc(this.firestore, path, id), data);
  }

  getDoc<tipo>(path: string, id: string) {
    return docData(doc(this.firestore, path, id));
  }
  
  setDoc(path: string, id: string, data: any) {
    const reference = doc(this.firestore, path, id)
    return setDoc(reference, data);
  }

  deleteDoc(id: string, path: string) {
    return deleteDoc(doc(this.firestore, path, id))
  }

  updateDoc(path: string, data: any) {
    return updateDoc(doc(this.firestore, path), data);
  }
  getID() {
    return doc(collection(this.firestore, 'id')).id;
  }
  
  getDataFirestore<tipo>(path: string) {
   const dataRef = collection(this.firestore, path);
   return dataRef;
  }

  getQueryCollectionOrder<tipo>(path: string) {
    const dataRef = collection(this.firestore, path);
    const q = query(dataRef, orderBy("herramienta", "asc"))
    return q;
  }

  getIdElement(userId: string, path: string) {
    const dataRef = collection(this.firestore, path);
    return collectionSnapshots(query(dataRef, where("student.uid", "==", userId), where("status", "==", "pendiente")));
  }

  
}
