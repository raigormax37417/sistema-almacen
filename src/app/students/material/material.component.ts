import { Component, OnInit } from '@angular/core';
import { GetDataFirestoreService } from 'src/app/services/get-data-firestore.service';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  public page: number = 0;
  public search: string = "";

  dataFirestore:any[] = [];
  constructor(private _getDataOnFirestore: GetDataFirestoreService) { }

  ngOnInit(): void {
    this.getDataOnFirestore();
  }
   getDataOnFirestore() {
    this._getDataOnFirestore.getDataFirestore().subscribe(data=> {
      this.dataFirestore = [];
      data.forEach((element:any) => {
        this.dataFirestore.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  addDataQR() {
    console.log("clicked");
  }

  nextPage() {
    this.page+=5;
  }
  prevPage() {
    if(this.page > 0)
      this.page-=5;  
  }
  onSearchTool(search: string) {
      this.page = 0;
      this.search = search;
  }

}
