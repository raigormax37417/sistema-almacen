import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces';
import { OrderService } from 'src/app/services/order.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  public order!: Pedido[];
  private uid?: string;
  private path: string = "pedidos/";

  constructor(private toolService: ToolsService, private orderService: OrderService, private profile: ProfileService) {
    this.profile.profile.subscribe(profile => {
      this.uid = profile?.id;
      this.getUserOrders(this.uid);
    })
   }

  ngOnInit(): void {
  }

  async getUserOrders(uid: string | undefined) {
    const dataOrders: any[] = [];
    const fire = this.toolService.getUserDataFirestore<Pedido>(this.path, uid).subscribe( resp => {
      resp.map(data => {
        dataOrders.push(data.data());
        this.order = dataOrders;
      })
    })
  }
  formatDate(date: any){
    return new Date(date.seconds * 1000)
  }

}
