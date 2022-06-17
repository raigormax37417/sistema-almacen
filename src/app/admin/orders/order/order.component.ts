import { Component, OnInit } from '@angular/core';
import { DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Orders, Pedido } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private path: string = "pedidos/";
  public search: string = "";
  public page: number = 0;
  private unusubscribe!: DocumentData;
  dataOrder: Orders[] = [];
  constructor(public authService: AuthService, private _tools: ToolsService) {
  }

  ngOnInit(): void {
    this.getDataOnFirestore();
  }

  getDataOnFirestore() {
    const fire = this._tools.getDataFirestore<Pedido>(this.path);
    const dataFirestore: DocumentData[] = [];
    const unusubscribe = onSnapshot(fire, (QuerySnapshot) => {
      QuerySnapshot.forEach(doc => {
        dataFirestore.push(doc.data());
      });
      this.readFile(dataFirestore);
    });
  }
  readFile(order: any) {
    const orderResults = Object.keys(order).map(key => {
      const value = order[key];
      let getDate: Date = value.date.toDate();
      const newOrder: Orders = {
        id: value.id,
        profile: value.profile,
        status: value.status,
        tools: value.tools,
        date: getDate 
      }
      this.dataOrder.push(newOrder);
    });
    console.log(this.dataOrder);
  }
  deleteOrder(id: string) {
    if(confirm("Desea eliminar el pedido?")) 
      this._tools.deleteDoc(id,this.path);
    else return;
  }
  changeStatus(id: string) {
    if(confirm("Desea cambiar el estado del pedido?")) {
      const path: string = "pedidos/" + id + "/";
        this._tools.updateDoc(path, {
          status: "entregado",      
      }).then( function() {
        console.log("pedido entregado");
      });
    }
    else return;
  }
  nextPage() {
    this.page+=5;
  }
  prevPage() {
    if(this.page > 0)
      this.page-=5;  
  }
  onSearchTool(search: string) {
      this.page = 0;
      this.search = search;
  }
}
