import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('tool') toolRef!: ElementRef;
  @ViewChild('amount') amountRef!: ElementRef;

  private path: string = "herramientas/";
  public page: number = 0;
  tools : Tool[] = [];
  private unusubscribe: any;

  generateTool!: FormGroup;
  EditTool!: Tool;
  newTool: Tool = {
    herramienta: '',
    cantidad: 0,
    id: this._tools.getID(),
    date: new Date
  };

  isValid = false;
  isEdit!: boolean;

  constructor( private _tools: ToolsService,
               private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.generateTool = this.formBuilder.group({
      tool: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.getDataOnFirestore();
  }
  
  get Tools() { return this.generateTool.controls; }
  
  private firstLetterUperCase(value: string) {
    const firstCharacter = value.charAt(0).toUpperCase();
    const rest = value.substring(1, value.length);
    console.log(rest);
    return firstCharacter.concat(rest);
  }

  saveTool() {
    this.isValid = true;
    if(this.generateTool.invalid ) { return };
    const firstLetter = this.firstLetterUperCase(this.generateTool.value.tool);
    this.newTool.herramienta = firstLetter; 
    this.newTool.cantidad = parseInt(this.generateTool.value.amount);
    console.log(firstLetter);
    try {
      this._tools.createDoc(this.newTool, this.path, this.newTool.id); 
    } catch (error) {
      alert("Error permisos insuficientes");
    }
    alert("Enviado con éxito");
    this.clearFields();
  }
  editSaveTool() {
    if(this.isEdit) {
      this.isValid = true;
      if(this.generateTool.invalid ) { return };
      this.EditTool.herramienta = this.generateTool.value.tool;
      this.EditTool.cantidad = this.generateTool.value.amount;
      this.EditTool.date = new Date;
      console.log(this.editTool);
      try {
        this._tools.updateDoc(this.EditTool.id, this.path, this.EditTool);
      } catch (error) {
        alert("Error permisos insuficientes");
      }
      alert("Actualizado con éxito");
      this.clearFields();
    }
  }
  cancelTool() {
    this.isEdit = false;
    this.clearFields();
  }
  private clearFields() {
    this.toolRef.nativeElement.value = "";
    this.amountRef.nativeElement.value = "";
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
  editTool(tool:Tool ) {
    this.isEdit = true;
    this.toolRef.nativeElement.value=tool.herramienta;
    this.amountRef.nativeElement.value=tool.cantidad;
    this.EditTool = tool;
  }
  nextPage() {
    this.page+=5;
  }
  prevPage() {
    if(this.page > 0)
      this.page-=5;  
  }
}
