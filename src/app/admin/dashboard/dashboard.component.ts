import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentOrder? :Pedido 
  constructor() { }

  ngOnInit(): void {
  }
  showData(order: Pedido){
    console.log('order', order);
    this.currentOrder = order
    
  }

}
