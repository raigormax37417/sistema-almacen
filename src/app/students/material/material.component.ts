import { Component, OnInit } from '@angular/core';
import { onSnapshot, QuerySnapshot } from 'firebase/firestore';
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
  private path = "herramientas/";
  tools : Tool[] = [];
  private unusubscribe: any;

  constructor(private _tools : ToolsService) { }

  ngOnInit(): void {
    this.getDataOnFirestore();
  }
  getDataOnFirestore() {
    const fire = this._tools.getDataFirestore<Tool>(this.path);
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
