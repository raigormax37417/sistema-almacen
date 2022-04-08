import { Component, OnInit, ViewChild, ElementRef, QueryList } from '@angular/core';
import { GetDataFirestoreService } from 'src/app/services/get-data-firestore.service';
import { onSnapshot, QuerySnapshot, collection } from 'firebase/firestore';
import { Tool } from 'src/app/interfaces';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  public page: number = 0;
  public search: string = "";

  dataArrayTools: any[] = [];
  
  tools : Tool[] = [];
  private unusubscribe: any;

  constructor(private _getDataOnFirestore: GetDataFirestoreService,
              private _tools : ToolsService) { }

  ngOnInit(): void {
    this.getDataOnFirestore();
  }
   getDataOnFirestore() {
    const fire = this._getDataOnFirestore.getDataFirestore<Tool>();
    this.unusubscribe = onSnapshot(fire, (QuerySnapshot) => {
      const dataFirestore: any[] = [];
      QuerySnapshot.forEach(doc => {
       dataFirestore.push(doc.data());
       this.tools = dataFirestore;    
      });
    });
  }
  
  generateQR() {
    this.unusubscribe();
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
