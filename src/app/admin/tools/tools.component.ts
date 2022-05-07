import { Component, OnInit } from '@angular/core';
import { QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { ToolsService } from 'src/app/services/tools.service';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { Tool } from 'src/app/interfaces';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  private path: string = "herramientas/";
  public page: number = 0;
  tools : Tool[] = [];
  private unusubscribe: any;

  generateTool!: FormGroup;

  newTool: Tool = {
    herramienta: '',
    cantidad: 0,
    id: this._tools.getID(),
    date: new Date
  };

  isValid = false;

  constructor( private _tools: ToolsService,
               private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.generateTool = this.formBuilder.group({
      tool: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.getDataOnFirestore();
  }
  
  getTools() { return this.generateTool.controls; }

  saveTool() {
    if(this.isValid){
      if(this.generateTool.invalid ) { return };
      alert("Enviado con éxito");
    }
   this.newTool.herramienta = this.generateTool.value.tool; 
   this.newTool.cantidad = parseInt(this.generateTool.value.amount);

   console.log(this.generateTool.value);
   this._tools.createDoc(this.newTool, this.path, this.newTool.id); 
  }
  getDataOnFirestore() {
    const fire = this._tools.getDataFirestore<Tool>(this.path);
    this.unusubscribe = onSnapshot(fire, (QuerySnapshot) => {
      const dataFirestore: any[] = [];
      QuerySnapshot.forEach(doc => {
       dataFirestore.push(doc.data());
        console.log(doc.data());
       this.tools = dataFirestore;    
      });
    });
  }
  nextPage() {
    this.page+=5;
  }
  prevPage() {
    if(this.page > 0)
      this.page-=5;  
  }
}
