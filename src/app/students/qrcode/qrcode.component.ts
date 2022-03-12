import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  
  public dataQR:string ="";
  public widthValue: number = 0;
  constructor() {
    this.dataQR = "Solo almacenaría las palas y aparte serían los numeros";
    this.widthValue = 256;
  }

  ngOnInit(): void {
  }

}
