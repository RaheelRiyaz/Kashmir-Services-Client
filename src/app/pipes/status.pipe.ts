import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value === true ? 'Active' :  'Inactive';
  }

}
