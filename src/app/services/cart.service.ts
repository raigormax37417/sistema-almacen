import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { orderTool, Pedido, Tool } from 'src/app/interfaces';
import { ProfileService } from './profile.service';
import { ToolsService } from './tools.service';
import { getAuth } from 'firebase/auth';  

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private pedido!: Pedido;
  private path: string = "pedidos/";
  private uid! : any;
  private profile!: any;
  private isOrderExist!: Tool;
  private isOrderCompleted!: boolean;

  constructor(private _profile: ProfileService, public _tools: ToolsService, public route: Router) {
    const auth =  getAuth();
    const user = auth.currentUser;
    this._profile.profile.subscribe(
        profile => {
          this.uid = profile?.id;
          this.profile = profile;
          this.loadCart(this.uid);
        }
      )
  }
  loadCart(uid: string) {
        let p: any;
        const path = "profiles/"+ this.uid + "/" + this.path;
        this._tools.getDoc<Pedido>(path, uid).subscribe(res => {
          if(res) {
             p = res;
             this.pedido = p;
          } else
             this.initCart();             
        });
  }
  initCart() {
   this.pedido = {
      id : this.uid,
      profile: this.profile,
      tools : [],
      status: 'creado',
      date : new Date
    } 
  }
  addToolOn(tool: Tool) {
    this.isOrderExist = tool;
    if(this.uid.length) {
     const item = this.pedido.tools.find( orderTool => {
        return (orderTool.tool.id === tool.id);
      });
      if(item != undefined) {
        console.log(item);
        if(item.amount > item.tool.cantidad - 1) {
          alert("No hay más disponibles");
          return
        }
        else
          item.amount++;
      } else {
        const addItemTool: orderTool = {
          amount: 1,
          tool
        }
        this.pedido.tools.push(addItemTool);
      }
    } else {
      this.route.navigate(['/auth/login']);
    }
    const path = "profiles/"+ this.uid + "/" + this.path;
    this._tools.createDoc(this.pedido, path, this.pedido.id).then( () => {
        console.log("Registrado con exito");
    })
  }
  removeTool(tool: Tool) {
    if(this.uid.length) {
     let i = 0;
     const item = this.pedido.tools.find( (orderTool, index) => {
        i = index;
        return (orderTool.tool.id === tool.id);
      });
      if(item != undefined) 
        item.amount--;
        item?.amount === 0 ? this.pedido.tools.splice(i,1) : console.log("vacio");
    } else {
      this.route.navigate(['/auth/login']);
    }
    const path = "profiles/"+ this.uid + "/" + this.path;
    this._tools.createDoc(this.pedido, path, this.pedido.id).then( () => {
        console.log("Eliminado con exito");
    });
  }
  isOrderEmpty(): boolean {
    const item = this.pedido.tools.find( (orderTool) => orderTool.tool ? orderTool.tool : undefined);
    return item === undefined ? true : false;
  }
  isPendingOrder(uid: string): boolean {
    
    const order = this._tools.getUserOrder(this.path, uid)
    .subscribe(res => {
      res ? this.isOrderCompleted = true : this.isOrderCompleted = false;
    })
    
    console.log(order, this.isOrderCompleted);
    return this.isOrderCompleted;
    
  }
  makeOnOrder(): string {
    const item = this.pedido.tools.find( (orderTool) => orderTool.tool ? orderTool.tool : undefined);
      if(item === undefined) {
        return ""; 
      } 
      else {
        const id = this._tools.getID();
        this._tools.createDoc(this.pedido, this.path, id).then( () => {
            console.log("Creando pedido con exito");
        });
        this.clearCart(); 
        return id;
      } 
  }
  clearCart() {
    const path = "profiles/"+ this.uid + "/" + this.path;
    this._tools.deleteDoc(this.pedido.id, path).then(() => {
      console.log("Eliminado con  éxito");
    });
  }
}
