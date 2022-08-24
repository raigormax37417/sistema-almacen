import { onSnapshot } from 'firebase/firestore';
import { ToolsService } from 'src/app/services/tools.service';
import { AuthService } from 'src/app/services/auth.service';
import { Pedido, Orders } from 'src/app/interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @Input() order? : Pedido
  private path: string = "pedidos/";
  public search: string = "";
  public page: number = 0;
  private unusubscribe: any;
  dataOrder: Orders[] = [];
  constructor(public authService: AuthService, private _tools: ToolsService) {
  }

  ngOnInit(): void {
    this.getDataOnFirestore();
  }

  getDataOnFirestore() {
    const fire = this._tools.getQueryCollectionOrder<Pedido>(this.path, "date", "desc");
    this.unusubscribe = onSnapshot(fire, (QuerySnapshot) => {
    const dataFirestore: any[] = [];
      QuerySnapshot.forEach(doc => {
        dataFirestore.push(doc.data());
        this.dataOrder = dataFirestore;
      });
    });
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