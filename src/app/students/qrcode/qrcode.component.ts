import { Component, OnInit } from '@angular/core';
import { onSnapshot, query, where } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Tool } from 'src/app/interfaces';
import { ProfileService } from 'src/app/services/profile.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  
  public dataQR: string = "";
  public widthValue!: number;
  public qrState = true;
  private path = "pedidos/";
  private data: any[] = [];
  private uid: any;
  private id: any[] = [];
  private unusubscribe: any;
  constructor(private _tools: ToolsService, private _profile: ProfileService) {
    this._profile.profile.subscribe( profile => {
      this.uid = profile?.id;
      this.generateQR(this.uid);
    })
  }

  ngOnInit(): void {
    this.getQrCode();
  }
  getQrCode() {
    const fire = this._tools.getDataFirestore<Tool>(this.path);
    const dataFirestore: DocumentData[] = [];
    const userActiveOrder = query(fire, where("student.uid", "==", this.uid), where("status", "==", "solicitado"));
    this.unusubscribe = onSnapshot(userActiveOrder, (QuerySnapshot) => {
      QuerySnapshot.forEach(doc => {
       dataFirestore.push(doc.data());
        this.data = dataFirestore;
        this.id.push(doc.id);
      });
    });
  }
  generateQR(uid: string) {
    this.data.forEach( (res, index) => {
      uid === res.id ? this.dataQR = this.id[index] : this.dataQR = "";
      this.widthValue = 256;
    })
  }
}
