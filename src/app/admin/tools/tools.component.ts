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
  private imagesPath: string = "tools/";
  private file!: File;
  public page: number = 0;
  public search: string = "";
  public imageTool: string = "assets/img/tool-box.png";
  Tools : Tool[] = [];
  private unusubscribe: any;
  public modal: boolean = true;
  public Image: any = [];
  public url: string = "assets/img/tool-box.png";
  private FILESIZE: number = 2000000;
  generateTool!: FormGroup;
  EditTool!: Tool;
  newTool: Tool = {
    herramienta: '',
    cantidad: 0,
    img: '',
    id: this._tools.getID(),
    date: new Date
  };

  isValid: boolean = false;
  isEdit: boolean = false;
  @ViewChild('newImageInput') public newImageInput!: ElementRef;

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
    const unusubscribe = onSnapshot(fire, (QuerySnapshot) => {
      const dataFirestore: any[] = [];
      QuerySnapshot.forEach(doc => {
       dataFirestore.push(doc.data());
       this.Tools = dataFirestore;    
      });
    });
  }
  openModal(value: boolean) {
    value === false ? this.modal = false : this.modal = true;
  }
  get ToolsC() { return this.generateTool.controls; }
  
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
  selectImage(image: string) {
    console.log(image);
    this.imageTool = image;
    this.modal = true;
    this.Image = [];
  }
  public uploadImage(evt: any) {
    if(evt.target.files[0]) {
      if(evt.target.files[0].size >= this.FILESIZE) {
        alert("Tamaño mínimo 2mb excedido")
        this.newImageInput.nativeElement.value = "";
        return
      } else {
        var reader = new FileReader();
        reader.readAsDataURL(evt.target.files[0]);
        reader.onload=(event:any)=> {
          this.url=event.target.result;
        }
        this.file = evt.target.files[0];
      }
    }
  }
  public async sendImage() {
    const id = this._tools.getID();
    await this.storage.upload(this.imagesPath, this.file.name, this.file)
    .then( () => {
      alert("Se a subido correctamente");
      this.newImageInput.nativeElement.value = "";
      this.url = "";
    })
    .catch( () => {
      alert("Se a producido un error al subirlo, favor de intentarlo de nuevo");
    })
  }
  public discartImage() {
    this.url = "assets/img/tool-box.png";
    this.newImageInput.nativeElement.value = "";
  }
  saveTool() {
    this.isValid = true;
    if(this.generateTool.invalid ) { return };
    const firstLetter = this.firstLetterUperCase(this.generateTool.value.tool);
    this.newTool.herramienta = firstLetter; 
    this.newTool.cantidad = parseInt(this.generateTool.value.amount);
    this.newTool.img = this.imageTool;
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
