import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arayofObj:any[],trim:string): any[] {
    return arayofObj.filter((item) => item.title.toLowerCase().includes(trim.toLowerCase()));
  }

}
