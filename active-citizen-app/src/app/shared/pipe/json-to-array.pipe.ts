import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonToArray'
})
export class JsonToArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const array = [];

    for (const key in value) {
      if (key) {
        array.push({ key, value: value[key] });
      }
    }
    return array;
  }

}
