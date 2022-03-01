import { Component, OnInit } from '@angular/core';
import { GetDataFirebaseService } from 'src/app/services/get-data-firebase.service';

@Component({
  selector: 'app-dataqr-send',
  templateUrl: './dataqr-send.component.html',
  styleUrls: ['./dataqr-send.component.css']
})
export class DataqrSendComponent implements OnInit {
  dataFirestore: any[] = [];
  constructor(private _dataFirestoreService: GetDataFirebaseService) { }

  ngOnInit(): void {
    this.getDataOnFirestore();
  }
  getDataOnFirestore() {
    this._dataFirestoreService.getDataFirestore().subscribe(data=> {
      this.dataFirestore = [];
      data.forEach((element:any) => {
        this.dataFirestore.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
        console.log(this.dataFirestore);
      });
    })
  }
}
