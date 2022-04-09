import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'admin'
})
export class AdminPipe implements PipeTransform {

  transform(tool: any[], page: number = 0, search: string = ""): any {  
    if(this.firstLetterUpperCase(search).length === 0)
      return tool.slice(page ,page + 5);
    const filteredTools = tool.filter(tool => tool.herramienta.includes( this.firstLetterUpperCase(search) ));
    return filteredTools.slice(page, page + 5);
  }

  firstLetterUpperCase(value: string) {
    const firstCharacter = value.charAt(0).toUpperCase();
    const rest = value.substring(1, value.length);
    return firstCharacter.concat(rest);
  }

}
