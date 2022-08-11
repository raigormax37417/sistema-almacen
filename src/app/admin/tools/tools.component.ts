import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { ToolsService } from 'src/app/services/tools.service';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { Tool } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  @ViewChild('tool') toolRef!: ElementRef;
  @ViewChild('amount') amountRef!: ElementRef;

  private path: string = "herramientas/";
  private imagesLocalPath: string = "assets/img/tools/";
  public page: number = 0;
  tools : Tool[] = [];
  private unusubscribe: any;
  public modal: boolean = true;
  public Image: any = [];
  generateTool!: FormGroup;
  EditTool!: Tool;
  newTool: Tool = {
    herramienta: '',
    cantidad: 0,
    img: '',
    id: this._tools.getID(),
    date: new Date
  };

  isValid = false;
  isEdit!: boolean;

  constructor( private _tools: ToolsService,
               private formBuilder: FormBuilder,
               public authService: AuthService,
               private storage: StorageService) { }

  ngOnInit(): void {
    this.getDataOnFirestore();
    this.generateTool = this.formBuilder.group({
      tool: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }
  getDataOnFirestore() {
    const fire = this._tools.getQueryCollectionOrder<Tool>(this.path);
    this.unusubscribe = onSnapshot(fire, (QuerySnapshot) => {
      const dataFirestore: any[] = [];
      QuerySnapshot.forEach(doc => {
       dataFirestore.push(doc.data());
       this.tools = dataFirestore;    
      });
    });
  }
  openModal(value: boolean) {
    value == false ? this.modal = false : this.modal = true;
  }
  get Tools() { return this.generateTool.controls; }
  
  private firstLetterUperCase(value: string) {
    const firstCharacter = value.charAt(0).toUpperCase();
    const rest = value.substring(1, value.length);
    console.log(rest);
    return firstCharacter.concat(rest);
  }
  async getImages() {
    await this.storage.downloadImage('tools')
    .then( resp => {
      console.log(resp);
      this.Image = resp;
    })
  }

  saveTool() {
    this.isValid = true;
    if(this.generateTool.invalid ) { return };
    const firstLetter = this.firstLetterUperCase(this.generateTool.value.tool);
    this.newTool.herramienta = firstLetter; 
    this.newTool.cantidad = parseInt(this.generateTool.value.amount);
    console.log(firstLetter);
    this._tools.createDoc(this.newTool, this.path, this.newTool.id).catch( () => {
      throw new Error('Error al crear el registro');
    }); 
    alert("Enviado con éxito");
    this.clearFields();
  }
  editSaveTool() {
    if(this.isEdit) {
      this.isValid = true;
      console.log(this.generateTool.value);
      if(this.generateTool.invalid ) { return };
      this.EditTool.date = new Date;
      console.log(this.editTool);
      this._tools.setDoc(this.path, this.EditTool.id, this.EditTool).catch( () => {
          throw new Error('Error al actualizar los datos');
      });
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
  editTool(tool:Tool) {
    this.isEdit = true;
    this.toolRef.nativeElement.value=tool.herramienta;
    this.amountRef.nativeElement.value=tool.cantidad;
    this.EditTool = tool;
    this.generateTool.value.tool = this.EditTool.herramienta;
    this.generateTool.value.amount = this.EditTool.cantidad;
  }
  nextPage() {
    this.page+=5;
  }
  prevPage() {
    if(this.page > 0)
      this.page-=5;  
  }
}
