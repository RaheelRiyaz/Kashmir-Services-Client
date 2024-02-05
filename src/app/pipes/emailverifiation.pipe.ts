import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailverification'
})
export class EmailverificationPipe implements PipeTransform {

  transform(value: boolean): string {
    return value==true?"Verified" : value==false ? "Not Verified" : 'Not Available' 
  }

}
