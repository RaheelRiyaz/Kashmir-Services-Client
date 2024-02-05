import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/Enums/role';
import { Status } from 'src/app/Enums/status';
import { UserRole } from 'src/app/Enums/user-role';
import { CustomerResponse } from 'src/app/Models/customer-response';
import { ShowEmp } from 'src/app/Models/show-emp';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  constructor(private service: AccountService) {}
  employees: CustomerResponse[] = [];
  employee: ShowEmp = new ShowEmp();
  ngOnInit(): void {
    this.updateTable();
  }
  updateTable() {
    this.service.getEmployees(this.employee).subscribe({
      next: (response) => {
        this.employees = response.result;
      },
    });
  }

  toggleRole(e: any) {
    this.employee.roles = Number(e.target.value);
    this.updateTable();
  }

  toggleStatus(e: any) {
    console.log(e.target.value);

    this.employee.status = Number(e.target.value);
    this.updateTable();
  }

  filterEmployeesList(name: string) {
    this.employee.searchTerm = name;
    this.updateTable();
  }
}
