import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { onSnapshot, query, where } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Pedido } from 'src/app/interfaces';
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
  public data: any[] = [];
  private uid?: string;
  private uidQR?: string;
  private id: any[] = [];
  private unusubscribe: any;
  constructor(private _tools: ToolsService, private _profile: ProfileService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.uidQR = params['id'];
      console.log(this.uidQR);
    });
    this._profile.profile.subscribe(profile => {
      this.uid = profile?.id;
      this.getQrCode();
      this.generateQR(this.uid!)
      console.log({ uid: this.uid });
    })
  }

  ngOnInit(): void {

  }
  getQrCode() {
    console.log({ uid: this.uid });
    const fire = this._tools.getDataFirestore<Pedido>(this.path);
    const userActiveOrder = query(fire, where("status", "==", "solicitado"), where("profile.id", "==", this.uid));
    this.unusubscribe = onSnapshot(userActiveOrder, (QuerySnapshot) => {
      const dataFirestore: DocumentData[] = [];
      QuerySnapshot.forEach(doc => {
        dataFirestore.push(doc.data());
        this.id.push(doc.id);
        // console.log({ data: this.data });
      });
      this.data = dataFirestore as unknown as any[];
      if (this.data.length) {
        // console.log({ datalengt: this.data[0].id });
      }
    });
  }
  generateQR(uid: string) {
    console.log('yuid', uid);
    this.dataQR = uid
    this.widthValue = 256; 
  }
}
