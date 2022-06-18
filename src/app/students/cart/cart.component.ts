import { Component, OnInit } from '@angular/core';
import { onSnapshot } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { orderTool, Pedido, Tool } from 'src/app/interfaces';
import { CartService } from 'src/app/services/cart.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pedido!: Pedido;
  pedidos: any[] = [];
  private path: string = "pedidos/";
  private uid: any;
  unusubscribe: any;
  constructor(private _tools: ToolsService, private _cart: CartService, private _profile: ProfileService) { 
    this._profile.profile.subscribe( profile => {
      this.uid = profile?.id;
      this.getOrders(this.uid);
    })
  }
  ngOnInit(): void {
  }

  getOrders(uid: string) {
    const path = "profiles/" + uid + "/" + this.path;
    const fire = this._tools.getDataFirestore<Pedido>(path);
    this.unusubscribe = onSnapshot(fire, (QuerySnapshot) => {
    const dataFirestore: any[] = [];
      QuerySnapshot.forEach(doc => {
       dataFirestore.push(doc.data());
       this.pedidos = dataFirestore[0].tools;
        console.log(this.pedidos);
      });
    }); 
  }
  removeTool(tool: Tool) {
    this._cart.removeTool(tool);
  }

}
