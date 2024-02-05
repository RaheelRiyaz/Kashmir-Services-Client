import { Component, OnInit } from '@angular/core';
import { CustomerResponse } from 'src/app/Models/customer-response';
import { ShowCustomer } from 'src/app/Models/show-customer';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customerModel: ShowCustomer = new ShowCustomer();
  customerArray: CustomerResponse[] = [];
  constructor(private service: AccountService) {}

  ngOnInit(): void {
    this.updateTable();
  }
  updateTable(): void {
    this.service.getCustomers(this.customerModel).subscribe((response) => {
      this.customerArray = response.result;
    });
  }
  SeachCustomer(value: string): void {
    this.customerModel.searchTerm = value;
    this.updateTable();
  }
  toggleStatus(event: any): void {
    this.customerModel.status = event.target.value;
    this.updateTable();
  }
}
