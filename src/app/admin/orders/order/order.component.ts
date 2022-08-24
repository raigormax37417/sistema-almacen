import { OrderService } from './../../../services/order.service';
import { Component, Input, OnInit } from '@angular/core';
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

  @Input() order? : Pedido
  private path: string = "pedidos/";
  public search: string = "";
  public page: number = 0;
  private unusubscribe: any;
  dataOrder: Orders[] = [];
  constructor(public authService: AuthService, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getDataOnFirestore();
  }

  getDataOnFirestore() {
  }
  deleteOrder(id: string) {
    if(confirm("Desea eliminar el pedido?")) 
      // this.orderService.deleteDoc(id,this.path);
      console.log('delete');
      
    else return;
  }
  changeStatus(id: string) {
    if( this.order?.status=='solicitado' && confirm("Desea cambiar el estado del pedido?")) {
      const path: string = "pedidos/" + id + "/";
      this.order.status = 'prestado'
      this.orderService.update(this.order).then( ()=> {
        console.log("pedido entregado");
        this.order = undefined
      });
    }
    else  if( this.order?.status=='prestado' && confirm("Confirma que se han devuelto las herramientas prestadas?")) {
      const path: string = "pedidos/" + id + "/";
      this.order.status = 'entregado'
        this.orderService.update(this.order).then( () =>{
        console.log("Material devuelto");
        this.order = undefined
      });
    }
    else 
    this.order = undefined

    return;
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
