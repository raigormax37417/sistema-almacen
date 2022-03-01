import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qr-generate',
  templateUrl: './qr-generate.component.html',
  styleUrls: ['./qr-generate.component.css']
})
export class QrGenerateComponent implements OnInit {
  @Input() dataTableQR: any;
  myAngularQrCode : any;
  constructor() {
    this.myAngularQrCode = "Codigo QR de ejemplo";
  }

  ngOnInit(): void {
  }

}
