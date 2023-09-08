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
  scannedOrder?: Pedido;
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
    const userOrder: any[] = [];
    this.toolService.getUserOrder<Pedido>(this.path, id)
    .subscribe( order => {
      order.map( response => {
       console.log(response.data());
       this.scannedOrder = response.data() as Pedido;
      })
    });
    if (!this.scannedOrder) {
      return
    } else {
      if (this.scannedOrder.status === 'creado') {
        this.scannedOrder.status = 'solicitado';
        this.orderService.update(this.scannedOrder)
          .then(response => {
            this.isRegistered = true;
            this.registeredOrder();
          })
          .catch(error => console.log("Ocurrió un error al hacer el pedido"));
      } else if (this.scannedOrder.status === 'prestado') {
        this.isPending = true;
        this.pendingOrder();
      }
      else if (this.scannedOrder.status === 'entregado') {
        this.isComplete = true;
        this.completeOrder();
      }
    }
    // console.log({ id, order });

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
