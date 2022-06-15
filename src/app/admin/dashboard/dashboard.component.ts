import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentOrder? :Pedido 
  constructor(public userAuth: AuthService) { }

  ngOnInit(): void {
  }
  showData(order: Pedido){
    console.log('order', order);
    this.currentOrder = order
    
  }

}
