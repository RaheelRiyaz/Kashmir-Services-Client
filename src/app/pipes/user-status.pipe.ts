import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatusPipe',
})
export class UserStatusPipe implements PipeTransform {
  transform(value: any): string {
    return value === 1 ? 'Active' : value === 2 ? 'Inactive' : 'Blocked';
  }
}
