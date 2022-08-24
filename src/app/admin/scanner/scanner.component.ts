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
  scannedOrder?: Pedido
  private path: string = "pedidos/";
  public isRegistered: boolean = false;
  public isComplete: boolean = false;
  public isPending: boolean = false;

  constructor(private orderService: OrderService,
    private toolService: ToolsService) { }

  ngOnInit(): void {
  }

  async getOrder(id: string) {
    console.log(id);
    let order: Pedido = await this.orderService.getById(id)
    console.log({ id, order });

    if (!order) {
      return
    } else {
      this.scannedOrder = order
      if (order.status === 'creado') {
        order.status = 'solicitado';
        this.orderService.update(order)
          .then(response => {
            this.isRegistered = true;
            this.registeredOrder();
          })
          .catch(error => console.log("Ocurrió un error al hacer el pedido"));
        this.scannedOrder = order;
      } else if (order.status === 'prestado') {
        this.isPending = true;
        this.scannedOrder = order;
        this.pendingOrder();
      }
      else if (order.status === 'entregado') {
        this.scannedOrder = order;
        this.isComplete = true;
        this.completeOrder();

      }
    }
  }
  private pendingOrder() {
    let interval = setTimeout(() => {
      this.isPending = false;
      // this.scannedOrder =  undefined;
    }, 5000);
  }
  private registeredOrder() {
    let interval = setTimeout(() => {
      this.isRegistered = false;
    }, 5000);
  }
  private completeOrder() {
    let interval = setTimeout(() => {
      this.isComplete = false;
      this.scannedOrder = undefined;
    }, 5000);
  }
}
