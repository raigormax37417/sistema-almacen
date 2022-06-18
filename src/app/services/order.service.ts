import { Pedido } from './../interfaces/index';
import { Firestore, CollectionReference, collection, getDoc, doc, DocumentSnapshot } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { DocumentData } from 'rxfire/firestore/interfaces';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  path: string = 'pedidos/';
  colRef : CollectionReference
  currentOrder: DocumentSnapshot<DocumentData> | null = null
  constructor(private firestore: Firestore) {
    this.colRef = collection(firestore, this.path)
   }
   getById(id:string){
     return getDoc(doc(this.colRef, id)).then(r => {
       this.currentOrder = r;
       return r.data() as Pedido;
     })
   }
}
