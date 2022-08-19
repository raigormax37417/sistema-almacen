import { Component, OnInit } from '@angular/core';
import { onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Tool } from 'src/app/interfaces';
import { CartService } from 'src/app/services/cart.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToolsService } from 'src/app/services/tools.service';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  public page: number = 0;
  public search: string = "";
  public uid! : any;
  private path = "herramientas/";
  tools : Tool[] = [];
  private unusubscribe: any;

  constructor(private _tools : ToolsService, private _cart: CartService, private _profile: ProfileService,
              private router: Router) { 
    this._profile.profile.subscribe( profile => {
      this.uid = profile?.id;
    })
    const auth =  getAuth();
    const user = auth.currentUser;
    user ? "" : this.router.navigate(['/auth/login']);
     
  }

  ngOnInit(): void {
    this.getDataOnFirestore();
  }
  getDataOnFirestore() {
    const fire = this._tools.getQueryCollectionOrder<Tool>(this.path, "herramienta", "asc");
    this.unusubscribe = onSnapshot(fire, (QuerySnapshot) => {
    const dataFirestore: any[] = [];
      QuerySnapshot.forEach(doc => {
       dataFirestore.push(doc.data());
       this.tools = dataFirestore;    
      });
    });
  }
  addTool(tool: any) {
    this._cart.addToolOn(tool); 
  }
  generateQR() {
    this.unusubscribe();
    this._cart.makeOnOrder();
    if(this._cart.makeOnOrder() === "")
      this.router.navigate(['/students/material']);
    else
      this._cart.makeOnOrder(); 
      this.router.navigate(['/students/qrcode']);
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
