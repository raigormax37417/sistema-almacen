import { Pedido } from './../../interfaces/index';
import { Router } from '@angular/router';
import { OrderService } from './../../services/order.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  @Output() onGetList = new EventEmitter<Pedido>()
  constructor(private orderService:OrderService, private router: Router) { }

  ngOnInit(): void {
  }

  async getOrder(id: string){
    let order  = await this.orderService.getById(id)
    console.log({id, order});
    if (!order){
      return
    }
    
    if (order.status == 'enviado') {
      this.router.navigate(['/admin/orders/inspect-order', order.id])
    }
    return this.onGetList.emit(order)
  }
}
