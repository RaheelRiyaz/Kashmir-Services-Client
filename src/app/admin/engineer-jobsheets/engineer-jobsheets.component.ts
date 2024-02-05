import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobSheet } from 'src/app/Models/jobSheet';
import { User } from 'src/app/Models/user';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enginner-jobsheet',
  templateUrl: './engineer-jobsheets.component.html',
  styleUrls: ['./engineer-jobsheets.component.css']
})
export class EnginnerJobsheetComponent implements OnInit {

  customerDetails:User=new User();
  id!:string
  constructor(private service: BaseService, private activatedRoute : ActivatedRoute) {}
  jobsheets: JobSheet[] = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((searchParam) => {
      this.id = searchParam['id'];
    });
    this.getAllJobShets();
  }
  getAllJobShets(): void {
    this.service
      .Fetch<JobSheet[]>(
        'engineer/my-jobsheet?engineerId='+this.id
      )
      .subscribe({
        next: (response) => {
          console.log(response);

          this.jobsheets = response.result;
        },
      });
  }
  searchByJobNo(val: string) {
    this.service
      .Fetch<JobSheet>(`engineer/jobsheet?engId=${this.id}&jobNo=${val}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.jobsheets = [response.result];
          }
        },
        error: (err) => {
          environment.fireErrorSwal(err.statusText);
        },
      });
  }
  getCustomerDetails(id: any): void {
    this.service.Find<User>('users/' + id).subscribe({
      next: (response) => {
        this.customerDetails=response.result;
        console.log(this.customerDetails)
        console.log(response)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAll(val: string) {
    if (val.length === 0) {
      this.getAllJobShets();
    }
  }

  filterByStatus(val: string) {
    this.service
      .Fetch<JobSheet[]>(
        `engineer/jobsheet/callstatus?engId=${this.id}&callstatus=${val}`
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.jobsheets = response.result;
          }
        },
        error: (err) => {
          environment.fireErrorSwal(err.statusText);
        },
      });
  }
}
