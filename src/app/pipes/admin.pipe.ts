import { Pipe, PipeTransform } from '@angular/core';
import { Pedido, Tool } from '../interfaces';

@Pipe({
  name: 'admin'
})
export class AdminPipe implements PipeTransform {
  
  pedido!: Pedido[];
  tools!: Tool[];

  transform(tool: any[], page: number = 0, search: string = ""): any {  
    if(this.firstLetterUpperCase(search).length === 0)
      return tool.slice(page ,page + 5);   
    let filteredTools: any;
    if(tool === this.tools) { 
       filteredTools = tool.filter(tool => tool.herramienta.includes(this.firstLetterUpperCase(search)));
    } else {
      filteredTools = tool.filter(tool => tool.profile.controlNumber.includes(search));
    }
    return filteredTools.slice( page, page + 5);
  }

  firstLetterUpperCase(value: string) {
    const firstCharacter = value.charAt(0).toUpperCase();
    const rest = value.substring(1, value.length);
    return firstCharacter.concat(rest);
  }

}
