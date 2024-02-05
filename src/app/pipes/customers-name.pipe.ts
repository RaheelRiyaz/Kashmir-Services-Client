import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../Enums/role';

@Pipe({
  name: 'customersName',
})
export class CustomersNamePipe implements PipeTransform {
  transform(value: Role, ...args: unknown[]): string {
    return value === Role.Admin
      ? 'Admin'
      : value === Role.Manager
      ? 'Manager'
      : value === Role.ServiceEngineer
      ? 'Engineer'
      : 'Admin';
  }
}
