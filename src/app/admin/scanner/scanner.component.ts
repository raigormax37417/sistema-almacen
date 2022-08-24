import { Orders, Pedido } from './../../interfaces/index';
import { OrderService } from './../../services/order.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  @Output() onGetList = new EventEmitter<Pedido>()
  scannedOrder? : Pedido 
  private path: string = "pedidos/";
  public isComplete: boolean = false;
  public isPending: boolean = false;

  constructor(private orderService:OrderService,
              private toolService: ToolsService  ) { }

  ngOnInit(): void {
  }

  async getOrder(id: string){
    console.log(id);
    let order: Pedido = await this.orderService.getById(id)
    console.log({id, order});
    
    if (!order){
      return
    } else {
      this.scannedOrder = order
      if(order.status === 'solicitado') {
        order.status = 'prestado';
        this.orderService.update(order)
        .then(response => {
          this.isComplete = true;
          this.timer();
        })
        .catch(error => console.log("Ocurrió un error al hacer el pedido"));
        this.scannedOrder = order;
      } else if(order.status === 'prestado') {
        this.scannedOrder = order;
        this.isPending = true;
        this.pendingOrder();
      }
    }
  }
  private timer() {
    let interval = setInterval(() => {
      this.isComplete = false;
      this.scannedOrder =  undefined;
    }, 5000);
  }
  private pendingOrder() {
    let interval = setInterval(() => {
      this.isPending = false;
    }, 5000);
  }
}
