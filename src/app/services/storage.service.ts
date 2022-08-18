import { Injectable } from '@angular/core';
import { Storage, ref, deleteObject, uploadBytes, uploadString,
  uploadBytesResumable, percentage, getDownloadURL } from '@angular/fire/storage';
import { getStorage, listAll } from 'firebase/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  uploadPercent?: Observable<any>;
  url?: any;
  references: any = [];
  constructor(private storage: Storage) { }

  async upload (
    folder: string,
    name: string,
    file: File | null
  ): Promise<string> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`; {
      if(file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytesResumable(storageRef, file);
          this.uploadPercent = percentage(task);
          await task;
          this.url = await getDownloadURL(storageRef);
        } catch (e : any) {
          console.error(e);
        }
      } else {

      }
      return this.url;
    }
  }
  async downloadImage (
    folder: string
  ): Promise<string> {
    const path = `${folder}/`; {
        try {
          this.references = [];
          const storage = getStorage();
          const pathReference = ref(storage, folder)
          listAll(pathReference)
          .then( (res) => {
            const data: any[] = [];
            res.items.forEach((itemsRef) => {
              itemsRef.fullPath;
              this.getImagesURL(itemsRef.fullPath)
              .then(response => {
                this.references.push(response);
              })
            })
            return this.references;
          })
          .catch( (error) => {
            switch(error.code) {
              case 'storage/object-not-found':
                console.log("Objeto no encontrado",error.code);
              break;
              case 'storage/unauthorized':
                console.log("No autorizado",error.code);
              break;
              case 'storage/canceled':
                console.log("cancelado",error.code);
              break;
              case 'storage/unknown':
                console.log("Desconocido",error.code);
              break;
            }
          });
        } catch (e : any) {
          console.error(e);
        }
      return this.references;
    }
  }
 private async getImagesURL(name: string): Promise<string> {
    let url: any;
    try {
    const storage = getStorage();    
    const pathReference = ref(storage, name);
    url = await getDownloadURL(pathReference)
    .then( (response) => {
      return response;
    })
    .catch( (error) => {
      switch(error.code) {
        case 'storage/object-not-found':
          console.log("Objeto no encontrado",error.code);
        break;
        case 'storage/unauthorized':
          console.log("No autorizado",error.code);
        break;
        case 'storage/canceled':
          console.log("cancelado",error.code);
        break;
        case 'storage/unknown':
          console.log("Desconocido",error.code);
        break;
      }
    });
  } catch (e : any) {
    console.error(e);
  }

  return url;

  }
  async removeImg(
    url: string
  ) {
    const storage = getStorage();
    const desertRef = ref(storage, url);

   await deleteObject(desertRef).then( () => {
      console.log("sucess");
    }).catch( (error) => {
      console.log(error);
    })
  }  
}
