import { Pedido } from './../interfaces/index';
import { Firestore, CollectionReference, collection, getDoc, doc, DocumentSnapshot, setDoc } from '@angular/fire/firestore';
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
   getById(id:string | undefined){
     return getDoc(doc(this.colRef, id)).then(r => {
       this.currentOrder = r
       return r.data() as Pedido
     })
   }
   update(order: Pedido){
     return setDoc(doc(this.colRef, order.id), order)
   }
}
